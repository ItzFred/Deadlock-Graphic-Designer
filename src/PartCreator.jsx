import { useContext, useEffect, useState } from "react"
import Utils from "./Utils";

function PartCreator(values){

    function AddComp(){

        if(Utils.GetCurrentItemDict()["itemComponents"] === undefined) Utils.SetCurrentItemDictKey("itemComponents",{})
            
        var comps = Utils.GetCurrentItemDict()["itemComponents"];
        if (Object.keys(comps).length == 0) {          
            comps["Part0"] = [localStorage.getItem("SelectedItemComponent")]
            Utils.SetCurrentItemDictKey("ItemComponent_Part0", {})
        }
        else{
            var num = "Part"+Math.floor(Math.random() * 100000)
            comps[num] = [localStorage.getItem("SelectedItemComponent")] 
            Utils.SetCurrentItemDictKey("ItemComponent_"+num, {})
        }

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