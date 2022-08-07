import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Sommet } from "../../model/sommet.model";

import * as go from 'gojs';
import { ToastService } from 'src/app/service/toast.service';
import { FakedataService } from 'src/app/service/fakedata.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { ConvertImageService } from 'src/app/service/convert-image.service';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ModalService } from 'src/app/service/modal.service';

import { MatBadgeModule } from '@angular/material/badge';


import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


const $ = go.GraphObject.make;

@Component({
  selector: 'app-min-max',
  templateUrl: './min-max.component.html',
  styleUrls: ['./min-max.component.scss']
})
export class MinMaxComponent implements OnInit {

  imageObject: Array<object> = [];

  title: string = "CHO - FORD MIN MAX";

  visible: boolean = true;

  data: any = [];

  icon: String = "history";


  diagram: go.Diagram = null;

  algorithme: String = "FORD";

  arc_error: any[] = [];



  @Input()
  model: go.Model;

  @Output()
  nodeClicked = new EventEmitter();


  data_in_diagrame: any = [];

  constructor(private toast: ToastService,
    private localStorage: LocalStorageService,
    private router: ActivatedRoute,
    private fakedata: FakedataService,
    private ConvertImage: ConvertImageService,
    private modale: ModalService) {
  }

  ngOnInit(): void {
    this.data = this.fakedata.minimale;
  }

  ngAfterViewInit() {


    var roundedRectangleParams = {
      parameter1: 2,  // set the rounded corner
      spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight  // make content go all the way to inside edges of rounded corners
    };

    this.diagram =
      $(go.Diagram, "myDiagramDive",  // must name or refer to the DIV HTML element
        {
          "animationManager.initialAnimationStyle": go.AnimationManager.None,
          "InitialAnimationStarting": function (e) {
            var animation = e.subject.defaultAnimation;
            animation.easing = go.Animation.EaseOutExpo;
            animation.duration = 900;
            animation.add(e.diagram, 'scale', 0.1, 1);
            animation.add(e.diagram, 'opacity', 0, 1);
          },

          // have mouse wheel events zoom in and out instead of scroll up and down
          "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
          // support double-click in background creating a new node
          "clickCreatingTool.archetypeNodeData": { text: "SOMMET" },
          // enable undo & redo
          "undoManager.isEnabled": true,
          positionComputation: function (diagram, pt) {
            return new go.Point(Math.floor(pt.x), Math.floor(pt.y));
          }
        });

    // when the document is modified, add a "*" to the title and enable the "Save" button
    this.diagram.addDiagramListener("Modified", function (e) {
      var idx = document.title.indexOf("*");
    });

    // define the Node template
    this.diagram.nodeTemplate =

      $(go.Node, "Horizontal",
        {
          locationSpot: go.Spot.Top,
          isShadowed: true, shadowBlur: 1,
          shadowOffset: new go.Point(0, 1),
          shadowColor: "rgba(0, 0, 0, .14)"
        },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Panel, "Spot",
          $(go.Shape, "Circle",
            new go.Binding("fill", "color"),
            roundedRectangleParams,
            {
              name: "SHAPE", fill: "#ffffff", strokeWidth: 0,
              stroke: null,
              desiredSize: new go.Size(30, 30),
              portId: "",  // this Shape is the Node's port, not the whole Node
              fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
              toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
              cursor: "pointer"
            }),
          $(go.TextBlock, {
            font: "bold small-caps 11pt helvetica, bold arial, sans-serif", stroke: "rgba(0, 0, 0, .87)",
            editable: true
          },
            new go.Binding("text").makeTwoWay()
          )
        ),
        $(go.TextBlock,
          new go.Binding("text", "texte").makeTwoWay()),
        {
          click: function (e, obj) { console.log("Clicked on " + obj.part.data.id); },
          selectionChanged: function (part) {
            var shape = part.elt(0);
            shape.fill = part.isSelected ? "#aa44bb" : "white";
          }
        }
      );


    // start all nodes yellow
    this.diagram.model.modelData.color = "yellow";


    // unlike the normal selection Adornment, this one includes a Button
    this.diagram.nodeTemplate.selectionAdornmentTemplate =
      $(go.Adornment, "Spot",
        $(go.Panel, "Auto",
          $(go.Shape, "Circle", roundedRectangleParams,
            { fill: null, stroke: "#7986cb", strokeWidth: 3 }),
          $(go.Placeholder)  // a Placeholder sizes itself to the selected Node
        ),
        // the button to create a "next" node, at the top-right corner
        $("Button",
          {
            alignment: go.Spot.TopRight,
            click: addNodeAndLink  // this function is defined below
          },
          $(go.Shape, "PlusLine", { width: 6, height: 6 })
        ) // end button
      ); // end Adornment

    this.diagram.nodeTemplateMap.add("Start",
      $(go.Node, "Spot", { desiredSize: new go.Size(75, 75) },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, "Circle",
          {
            fill: "#52ce60", /* green */
            stroke: null,
            portId: "",
            fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
            toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
            cursor: "pointer"
          }),
        $(go.TextBlock, "Start",
          {
            font: "bold 16pt helvetica, bold arial, sans-serif",
            stroke: "whitesmoke"
          })
      )
    );

    this.diagram.nodeTemplateMap.add("End",
      $(go.Node, "Spot", { desiredSize: new go.Size(100, 100) },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, "Circle",
          {
            fill: "maroon",
            stroke: null,
            portId: "",
            fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
            toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
            cursor: "pointer"
          }),
        $(go.Shape, "Circle", { fill: null, desiredSize: new go.Size(65, 65), strokeWidth: 2, stroke: "whitesmoke" }),
        $(go.TextBlock, "End",
          {
            font: "bold 16pt helvetica, bold arial, sans-serif",
            stroke: "whitesmoke"
          })
      )
    );

    // clicking the button inserts a new node to the right of the selected node,
    // and adds a link to that new node
    function addNodeAndLink(e, obj) {
      var adornment = obj.part;
      var diagram = e.diagram;
      diagram.startTransaction("Add State");

      // get the node data for which the user clicked the button
      var fromNode = adornment.adornedPart;
      var fromData = fromNode.data;

      // create a new "State" data object, positioned off to the right of the adorned Node
      var toData = { text: "SOMMET", texte: "", loc: "32" };
      var p = fromNode.location.copy();

      p.x += 200;
      toData.loc = go.Point.stringify(p);  // the "loc" property is a string, not a Point object
      // add the new node data to the model
      var model = diagram.model;
      model.addNodeData(toData);

      // create a link data from the old node data to the new node data
      var linkdata = {
        from: model.getKeyForNodeData(fromData),  // or just: fromData.id
        to: model.getKeyForNodeData(toData),
        text: "distance"
      };
      // and add the link data to the model
      model.addLinkData(linkdata);

      // select the new Node
      var newnode = diagram.findNodeForData(toData);
      diagram.select(newnode);

      diagram.commitTransaction("Add State");

      // if the new node is off-screen, scroll the diagram to show the new node
      diagram.scrollToRect(newnode.actualBounds);
    }

    // replace the default Link template in the linkTemplateMap
    this.diagram.linkTemplate =
      $(go.Link,  // the whole link panel
        {
          curve: go.Link.Bezier,
          adjusting: go.Link.Stretch,
          reshapable: true, relinkableFrom: true, relinkableTo: true,
          toShortLength: 3
        },
        new go.Binding("points").makeTwoWay(),
        new go.Binding("curviness"),
        $(go.Shape,  // the link shape
          new go.Binding("stroke", "color"),
          { strokeWidth: 1.5 },
          new go.Binding('stroke', 'progress', function (progress) {
            return progress ? "#52ce60" /* green */ : 'black';
          }),
          new go.Binding('strokeWidth', 'progress', function (progress) {
            return progress ? 2.5 : 1.5;
          })
        ),
        $(go.Shape,  // the arrowhead
          { toArrow: "standard", stroke: null },
          new go.Binding('fill', 'progress', function (progress) {
            return progress ? "#52ce60" /* green */ : 'black';
          })),
        $(go.Panel, "Auto",
          $(go.Shape,  // the label background, which becomes transparent around the edges
            {
              fill: $(go.Brush, "Radial",
                { 0: "rgb(245, 245, 245)", 0.7: "rgb(245, 245, 245)", 1: "rgba(245, 245, 245, 0)" }),
              stroke: null
            }),
          $(go.TextBlock, "distance",  // the label text
            {
              textAlign: "center",
              font: "9pt helvetica, arial, sans-serif",
              margin: 4,
              editable: true  // enable in-place editing
            },
            // editing the text automatically updates the model data
            new go.Binding("text").makeTwoWay())
        )
      );

    //ALL listener 

    this.diagram.addDiagramListener("ObjectSingleClicked",
      function (e) {
        var part = e.subject.part;
        if (!(part instanceof go.Link)) console.log("Clicked on :", part.data);
        console.log(e);
      }
    );

    this.diagram.addModelChangedListener(function (evt) {
      // ignore unimportant Transaction events

      if (!evt.isTransactionFinished) return;
      var txn = evt.object;  // a Transaction
      if (txn === null) return;
      // iterate over all of the actual ChangedEvents of the Transaction
      txn.changes.each(function (e) {
        // record node insertions and removals
        if (e.change === go.ChangedEvent.Property) {
          if (e.modelChange === "linkFromKey") {
            console.log(evt.propertyName + " changed From key of link: " +
              e.object + " from: " + e.oldValue + " to: " + e.newValue);
          } else if (e.modelChange === "linkToKey") {
            console.log(evt.propertyName + " changed To key of link: " +
              e.object + " from: " + e.oldValue + " to: " + e.newValue);
          }
        } else if (e.change === go.ChangedEvent.Insert) {
          if (e.modelChange === "linkDataArray") {
            console.log(evt.propertyName + " added link: ", e.newValue);
          } else {
            console.log("ok");
          }
        } else if (e.change === go.ChangedEvent.Remove) {
          if (e.modelChange === "linkDataArray") {
            console.log(evt.propertyName + " removed link: ", e.oldValue);
          } else if (e.modelChange === "nodeDataArray") {
            console.log("Node removed");

            test(e, e.oldValue);
          }
          else {
            console.log("okok");
          }

        }
      });
    });





    // read in the JSON data from the "mySavedModel" element
    this.load();

    function test(evt, data) {
      let nodeDataArray = JSON.parse(evt.model.toJson()).nodeDataArray;
      console.log("node Array: ", nodeDataArray);
      for (let i = 0; i < nodeDataArray.length; i++) {
        if ((nodeDataArray[i].id * (-1)) > (data.id * (-1))) {
          var data = evt.model.findNodeDataForKey(nodeDataArray[i].id);
          // This will NOT change the color of the "Delta" Node
          // console.log("data", data);
          if (data !== null) evt.model.setDataProperty(data, "id", (nodeDataArray[i].id + 1));
        } else {
          //console.log("Tsy ovaina");
        }

      }
    }

  }

  // Show the diagram's model in JSON format
  save(algo) {
    this.data_in_diagrame = JSON.parse(this.diagram.model.toJson());
    console.log("data = ", this.data_in_diagrame);
    var x = this.data_in_diagrame.linkDataArray.length;
    //console.log(x * -1);
    if (algo == "min") {
      return this.detectInfinityLoopMin();
    } else {
      return this.detectInfinityLoopMax();
    }

  }
  load() {
    this.diagram.model = go.Model.fromJson(this.data);
  }

  // search if there is infinity loop path
  detectInfinityLoopMin() {
    this.arc_error = [];
    this.recoloriage();
    let trouve: Boolean = false;
    console.log("%c test ", "background: red;");
    let taille: number = this.data_in_diagrame.linkDataArray.length;
    let from: number;
    let to: number;
    from = this.data_in_diagrame.linkDataArray[0].from; //1 
    to = this.data_in_diagrame.linkDataArray[0].to; //2 
    for (let i = 1; i < taille; i++) {
      for (let j = 0; j < taille; j++) {
        if (parseInt(this.data_in_diagrame.linkDataArray[j].text) <= 0 || isNaN(parseInt(this.data_in_diagrame.linkDataArray[j].text))) {
          // console.log("%c arc entre form " + this.data_in_diagrame.linkDataArray[j].from + " to " + this.data_in_diagrame.linkDataArray[j].to, "background: red;");
          this.diagram.model.setDataProperty(this.data.linkDataArray[j], "color", "red");
          trouve = true;
          this.arc_error.push({ from: this.data_in_diagrame.linkDataArray[j].from, to: this.data_in_diagrame.linkDataArray[j].to });
        }
      }
      from = this.data_in_diagrame.linkDataArray[i].from; //1 
      to = this.data_in_diagrame.linkDataArray[i].to; //2 
    }

    return trouve;
  }


  // search if there is infinity loop path
  detectInfinityLoopMax() {
    this.arc_error = [];
    this.recoloriage();
    let trouve: Boolean = false;
    console.log("%c test ", "background: red;");
    let taille: number = this.data_in_diagrame.linkDataArray.length;
    let from: number;
    let to: number;
    from = this.data_in_diagrame.linkDataArray[0].from; //1 
    to = this.data_in_diagrame.linkDataArray[0].to; //2 
    for (let i = 1; i < taille; i++) {
      for (let j = 0; j < taille; j++) {
        if ((to == this.data_in_diagrame.linkDataArray[j].from && from == this.data_in_diagrame.linkDataArray[j].to) || parseInt(this.data_in_diagrame.linkDataArray[j].text) <= 0 || isNaN(parseInt(this.data_in_diagrame.linkDataArray[j].text))) {
          //console.log("%c indice : " + j + "  from " + this.data_in_diagrame.linkDataArray[j].from + " to : " + this.data_in_diagrame.linkDataArray[j].to, "background: green;");
          // this.diagram.model. (this.data_in_diagrame.linkDataArray[j]);
          this.diagram.model.setDataProperty(this.data.linkDataArray[j], "color", "red");
          this.arc_error.push({ from: this.data_in_diagrame.linkDataArray[j].from, to: this.data_in_diagrame.linkDataArray[j].to });
          trouve = true;
        }
        /* if (parseInt(this.data_in_diagrame.linkDataArray[j].text) <= 0 || isNaN(parseInt(this.data_in_diagrame.linkDataArray[j].text))) {
           console.log("%c arc entre form " + this.data_in_diagrame.linkDataArray[j].from + " to " + this.data_in_diagrame.linkDataArray[j].to, "background: red;");
           this.diagram.model.setDataProperty(this.data.linkDataArray[j], "color", "red");
           trouve = true;
         }*/
      }
      from = this.data_in_diagrame.linkDataArray[i].from; //1 
      to = this.data_in_diagrame.linkDataArray[i].to; //2 
    }

    return trouve;
  }


  //algorithm of Ford Max
  maxFord(tab) {
    let current: number = 0;
    let compte: number = 0;
    let next: number;
    let sub: number;
    let pos_i: number;
    let pos_j: number;
    let demitour: boolean = false;
    while (compte < tab.length - 1) {
      if (demitour) {
        demitour = false;
        current = pos_i;
      } else {
        pos_i = tab[current].getPosi();
      }
      for (let sous_cp = 0; sous_cp < tab[current].getIndex_succ().length; sous_cp++) {
        let res: number;
        //next = Integer.parseInt(tab.get(current).getIndex_succ().get(sous_cp).toString());
        pos_j = parseInt(tab[current].getIndex_succ()[sous_cp]);
        sub = tab[pos_j].getLambda() - tab[current].getLambda();
        if (pos_i < pos_j) {
          if (sub < parseInt(tab[current].getArc()[sous_cp])) {
            res = tab[current].getLambda() + parseInt(tab[current].getArc()[sous_cp]);
            tab[pos_j].setLambda(res);
            // console.log("*******************IF****************");
            // console.log("I : " + pos_i);
            // console.log("J  : " + pos_j);
            // console.log(tab[current].getLambda() + " + " + tab[current].getArc()[sous_cp] + " = " + res);            
          }
        }
        else {
          if (sub > parseInt(tab[current].getArc()[sous_cp]) || sub == parseInt(tab[current].getArc()[sous_cp])) {
            // console.log("****************NOTHING*******************");            
          } else {
            res = tab[current].getLambda() + parseInt(tab[current].getArc()[sous_cp]);
            tab[pos_j].setLambda(res);
            pos_i = pos_j;
            demitour = true;
            // console.log("*************ELSE**********************");
            // console.log("I : " + pos_i);
            // console.log("J  : " + pos_j);
            // console.log(tab[current].getLambda() + " + " + tab[current].getArc()[sous_cp] + " = " + res);
            compte = pos_i - 1;
            break;
          }
        }
      }
      compte++;
      current++;
    }
    this.putLamda(tab);
    //console.log("lambda farany ", tab);
  }


  //algorithm of Ford Min
  minFord(tab) {
    console.log("tab = ", tab);

    let current: number = 0;
    let compte: number = 0;
    let next: number;
    let sub: number;
    let pos_i: number;
    let pos_j: number;
    let demitour: boolean = false;
    // console.log("lengy = ", tab.length);
    while (compte < tab.length - 1) {
      if (demitour) {
        demitour = false;
        current = pos_i;
        //console.log('%c current ' + current, "color:yellow;");
      } else {
        pos_i = tab[current].getPosi();
      }
      for (let sous_cp = 0; sous_cp < tab[current].getIndex_succ().length; sous_cp++) {
        let res: number;
        //next = Integer.parseInt(tab.get(current).getIndex_succ().get(sous_cp).toString());
        pos_j = parseInt(tab[current].getIndex_succ()[sous_cp]);
        sub = tab[pos_j].getLambda() - tab[current].getLambda();
        // console.log("Sub_before = ", tab[pos_j].getLambda());
        if (pos_i < pos_j) {
          if (sub > parseInt(tab[current].getArc()[sous_cp])) {
            res = tab[current].getLambda() + parseInt(tab[current].getArc()[sous_cp]);
            tab[pos_j].setLambda(res);
            //console.log("Sub_after = ", tab[pos_i].getLambda());
            // console.log("*******************IF****************");
            // console.log("I : " + pos_i);
            // console.log("J  : " + pos_j);
            // console.log("Lamda " + pos_j + " = " + tab[current].getLambda() + " + " + tab[current].getArc()[sous_cp] + " = " + res);
            // console.log(sub + " > " + tab[current].getArc()[sous_cp]);
          }
        }
        else {
          if (sub <= parseInt(tab[current].getArc()[sous_cp]) || sub == 0 || sub < 0) {
            // console.log("****************NOTHING*******************");
            // console.log("I : " + pos_i);
            // console.log("J  : " + pos_j);
            // console.log(sub + " > " + tab[current].getArc()[sous_cp]);

            //console.log("%c elseif tsis raha " + compte, "color: red;");
          }
          else {
            res = tab[current].getLambda() + parseInt(tab[current].getArc()[sous_cp]);
            tab[pos_j].setLambda(res);
            // console.log("*************ELSE DEMI TOUR **********************");
            // console.log("I : " + pos_i);
            // console.log("J  : " + pos_j);
            // console.log(sub + " > " + tab[current].getArc()[sous_cp]);
            pos_i = pos_j;
            demitour = true;
            //console.log(" verss ---> : " + pos_j);
            compte = pos_i - 1;
            break;
          }
        }
      }
      //console.log("%c compte " + compte, "color: red;");
      compte++;
      current++;

    }

    this.putLamda(tab);
  }


  putLamda(tab) {
    console.log("Lmadan", tab);
    for (let i = 0; i < tab.length; i++) {

      var data = this.diagram.model.findNodeDataForKey("" + (i + 1) * (-1));
      // This will NOT change the color of the "Delta" Node
      // console.log("data", data);
      if (data !== null) this.diagram.model.setDataProperty(data, "texte", 'λ ' + (i + 1) + ' = ' + tab[i].lambda);
    }
  }


  // put data from Gojs to vector struct
  algoFusion(algo) {
    if (!this.save(algo)) {
      this.recoloriage();
      let k: number = 0;
      let nb: number;
      let tab = new Array();
      let taillelink: number = this.data_in_diagrame.linkDataArray.length;
      let tailleNode: number = this.data_in_diagrame.nodeDataArray.length;
      let sommet: Sommet;
      let trouve: boolean = false;
      for (let i = 0; i < tailleNode; i++) {
        trouve = false;
        //sommet = new Sommet(Infinity, (this.data_in_diagrame.linkDataArray[i].from * (-1)) - 2);4
        if (i == 0) {
          sommet = new Sommet(0, 0);
        } else {
          if (algo == 'max') {
            sommet = new Sommet(0, i);
          } else {
            sommet = new Sommet(Infinity, i);
          }
        }
        //console.log(sommet);
        for (let j = 0; j < taillelink; j++) {
          if ((this.data_in_diagrame.nodeDataArray[i].id * (-1)) == (this.data_in_diagrame.linkDataArray[j].from * (-1))) {
            // console.log("To= ", (this.data_in_diagrame.linkDataArray[j].to * (-1)) - 2);     
            sommet.addIndex_succ((this.data_in_diagrame.linkDataArray[j].to * (-1)) - 1);
            sommet.addArc(parseInt(this.data_in_diagrame.linkDataArray[j].text));
            trouve = true;
          }
          //console.log(this.data_in_diagrame.linkDataArray[j].from * (-1));
        }
        tab.push(sommet);
      }
      // console.log(tab);
      nb = this.nbInfToSup();
      if (algo == "max") {
        this.maxFord(tab);
        this.algorithme = "MAXIMISATION";
        this.toast.showSuccess("MAXIMISATION", "Algorithme", 5000);
      } else {
        this.minFord(tab);
        this.algorithme = "MINIMISATION";
        this.toast.showSuccess("MINIMISATION", "Algorithme", 5000);
      }

      for (k = 0; k <= nb; k++) {
        if (nb == 0) {
          this.findPath(tab);
          break;
        } else {
          this.findPath(tab);
        }
      }
    } else {
      //this.recoloriage();
      this.toast.showError(this.arc_error, "Erreur", 5000);
    }
    //this.detectInfinityLoop();
  }


  recoloriage() {
    for (let i = 0; i < this.data_in_diagrame["nodeDataArray"].length; i++) {
      var data = this.diagram.model.findNodeDataForKey("" + this.data_in_diagrame["nodeDataArray"][i].id);
      // This will NOT change the color of the "Delta" Node
      //console.log("data efefe", this.data_in_diagrame["nodeDataArray"][i].id);
      if (data !== null) this.diagram.model.setDataProperty(data, "color", "white");
    }

    //change color arc
    for (let j = 0; j < this.data_in_diagrame["linkDataArray"].length; j++) {
      this.diagram.model.setDataProperty(this.data.linkDataArray[j], "color", "black");
      this.diagram.model.setDataProperty(this.data.linkDataArray[j], "progress", false);
    }
  }

  // count the number of major "from" to minor "to"
  nbInfToSup(): number {
    let nb: number = 0;
    for (let i = 0; i < this.data_in_diagrame.linkDataArray.length; i++) {
      if (this.data_in_diagrame.linkDataArray[i].from * (-1) > this.data_in_diagrame.linkDataArray[i].to * (-1)) {
        // console.log("nb ++");
        nb++;
      }
    }
    // console.log("val nb " + nb);
    return nb;
  }


  //finding the exact path
  findPath(tab) {
    let taille: number = tab.length;
    let lambda: number;
    let lambda_first: number;
    let res_: number;
    let i: number = taille - 1;
    let lalana_miverina = new Array();
    // console.log(" %c+++++ calcule recule commance +++++", 'background: #222; color: #bada55');
    lambda_first = tab[i].getLambda();
    tab[i].setLalana(true);
    for (i; i >= 0; i--) {
      //lambda = lambda_first;
      for (let j = 0; j < this.data_in_diagrame.linkDataArray.length; j++) {
        if ((i + 1) == this.data_in_diagrame.linkDataArray[j].to * (-1)) {
          if (tab[i].getLalana()) {
            lambda = tab[i].getLambda();
            res_ = lambda - parseInt(this.data_in_diagrame.linkDataArray[j].text);
            if (res_ == tab[this.data_in_diagrame.linkDataArray[j].from * (-1) - 1].getLambda()) {
              tab[this.data_in_diagrame.linkDataArray[j].from * (-1) - 1].setLalana(true);
              lalana_miverina.push({ to: this.data_in_diagrame.linkDataArray[j].from * (-1), from: (i + 1) });
              // console.log(" %casina couleur ny arc " + this.data_in_diagrame.linkDataArray[j].from * (-1) + " to " + (i + 1), 'background: green; color: #bada55');
            } else {
              // console.log("tsy lalana");
            }
            // console.log(" %c lambda: " + lambda + " from'ny " + tab[this.data_in_diagrame.linkDataArray[j].from * (-1) - 1].getLambda(), 'background: #222; color: #bada55');
          }
        }
      }
    }
    // console.log("lalana miverina" + lalana_miverina);
    // this.delNoTo(lalana_miverina);
    this.coloriage(lalana_miverina);
  }


  // color the exact path and sommets
  coloriage(lalana_miverina) {
    //console.log(lalana_miverina);
    for (let i = 0; i < lalana_miverina.length; i++) {

      var data = this.diagram.model.findNodeDataForKey("" + lalana_miverina[i].to * (-1));
      // This will NOT change the color of the "Delta" Node
      // console.log("data", data);
      if (data !== null) this.diagram.model.setDataProperty(data, "color", "green");

      var data = this.diagram.model.findNodeDataForKey("" + lalana_miverina[i].from * (-1));
      // This will NOT change the color of the "Delta" Node
      // console.log("data", data);
      if (data !== null) this.diagram.model.setDataProperty(data, "color", "green");

      //change color arc
      for (let j = 0; j < this.data.linkDataArray.length; j++) {
        // console.log(lalana_miverina[i].from + " " + this.data.linkDataArray[j].from);
        if (lalana_miverina[i].to == (this.data.linkDataArray[j].from * (-1)) && lalana_miverina[i].from == (this.data.linkDataArray[j].to * (-1))) {
          this.diagram.model.setDataProperty(this.data.linkDataArray[j], "progress", true);
          // console.log("lalan");
        } else {
          // console.log("tsy lalan");
        }
      }
    }
    // console.log("lalana miverina" + lalana_miverina);
  }



  retour = function () {  // define a function named "incrementData" callable by onclick
    //console.log("Kez");

    var model = this.diagram.model;
    //console.log(model);

    model.startTransaction("increment");  // all model changes should happen in a transaction
    var data = model.nodeDataArray[0];  // get the first node data
    model.setDataProperty(data, "someValue", data.someValue + 1);
    model.commitTransaction("increment");  // all model changes should happen in a transaction
  };

  Save_image() {
    this.visible = false;
    var d = this.diagram.documentBounds;
    var halfWidth = d.width / 2;
    var halfHeight = d.height / 2;
    let img;
    img = this.diagram.makeImage({
      scale: 1,
      background: "AntiqueWhite",
      type: "image/jpeg"
    });
    //this.addImage(img); // Adds the image to a DIV below
    console.log(img.src);

    if (this.imageObject.push({
      image: img.src,
      thumbImage: img.src,
      alt: 'alt of image',
      title: this.algorithme
    })) {
      setTimeout(() => {
        this.visible = true;
        this.toast.showSuccess("Image historisée", "Succès", 1000);
      }, 2000)

    }

  }

  history() {
    this.modale.openDialog(this.imageObject);
  }

  addImage(img) {
    let image = document.getElementById('image');
    image.appendChild(img);
    // this.ConvertImage.getImage(img);
  }

  // When the blob is complete, make an anchor tag for it and use the tag to initiate a download
  // Works in Chrome, Firefox, Safari, Edge, IE11
  myCallback(blob) {
    var url = window.URL.createObjectURL(blob);
    var filename = "myBlobFile.png";

    var a = document.createElement("a");
    a.href = url;
    a.download = filename;

    // IE 11
    if (window.navigator.msSaveBlob !== undefined) {
      window.navigator.msSaveBlob(blob, filename);
      return;
    }

    document.body.appendChild(a);

    //console.log(a);


    requestAnimationFrame(function () {
      a.click(); window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });


  }

  makeBlob() {
    var blob = this.diagram.makeImageData({ background: "white", returnType: "blob", callback: this.myCallback });
  }

  public changeIcon(newIcon: string) {
    this.icon = newIcon;
  }


}
