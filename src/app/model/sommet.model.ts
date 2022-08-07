export class Sommet {
    private arc = new Array();
    private lambda: number;
    private posi_tache: number;
    private index_succ = new Array();
    private is_lalana: boolean = false;


    constructor(lambda, position) {
        this.lambda = lambda;
        this.posi_tache = position;
    }
    //getters
    public getArc(): any[] {
        return this.arc;
    }
    public getLambda(): number {
        return this.lambda;
    }
    public getPosi(): number {
        return this.posi_tache;
    }
    public getIndex_succ(): any[] {
        return this.index_succ;
    }
    public getLalana(): boolean {
        return this.is_lalana;
    }

    //setters
    public setLambda(lambda: number) {
        this.lambda = lambda;
    }
    public setLalana(lalana: boolean) {
        this.is_lalana = lalana;
    }

    //adders
    public addArc(arc: number) {
        this.arc.push(arc);
    }
    public addIndex_succ(succ: number) {
        this.index_succ.push(succ);
    }

}