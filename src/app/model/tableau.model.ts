export class TableauModel {
    public i: number;
    public j: number;
    public lamdaj_lamdai: number;
    public v_ij: number;
    public lamda_j: number;
    constructor(
        i: number,
        j: number,
        lamdaj_lamdai: number,
        v_ij: number,
        lamda_j:number
    ) {
        this.i = i;
        this.j = j;
        this.lamdaj_lamdai = lamdaj_lamdai;
        this.v_ij = v_ij;
        this.lamda_j = lamda_j;
    }

}