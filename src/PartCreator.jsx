import { useContext, useEffect, useState } from "react"
import Utils from "./Utils";

function PartCreator(values){

    function AddComp(){

        if(Utils.GetCurrentItemDict()["itemComponents"] === undefined) Utils.SetCurrentItemDictKey("itemComponents",{})
            
        var comps = Utils.GetCurrentItemDict()["itemComponents"];
        var num = "Part_"+localStorage.getItem("SelectedItemComponent")+"_"+crypto.randomUUID()
        comps[num] = [localStorage.getItem("SelectedItemComponent")] 
        Utils.SetCurrentItemDictKey("ItemComponent_"+num, {})

        Utils.SetCurrentItemDictKey("itemComponents", comps)    
        window.dispatchEvent(new Event("itemComponent"));
    }
    
    return(
        <>
            <button onClick={AddComp}>Add Part</button>
        </>
    )
}

export default PartCreator