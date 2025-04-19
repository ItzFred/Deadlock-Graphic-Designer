import { useState, useEffect, useRef } from "react"
import ComponentListElement from "./ComponentListElement"
import Utils from "./Utils"

function ComponentList(values){

    const IsFirstRender = useRef(true)
    const [components, SetComponents] = useState([])

    function AddElement(){

        window.dispatchEvent(new Event("ComponentListElementRemoved_"+values.index));

        var dict = Utils.GetCurrentItemDict()["ItemComponent_"+values.index];
        if (dict == undefined || dict == null) return

        var highestNumber = 0
        for (var i = 0; i < 1000; i++){
            if (dict[values.path] === undefined) break;
            else if (!Object.keys(dict[values.path]).includes("A"+JSON.stringify(i))) {
                highestNumber = i
                break;
            }
        }

        Utils.SetDictionary(dict, values.path+".A"+highestNumber, [])
        Utils.SetCurrentItemDictKey("ItemComponent_"+values.index, dict)

        SetComponents( prev => [...prev, <ComponentListElement index={values.index} path={values.path} place={highestNumber} components={values.components}/>])
        window.dispatchEvent(new Event("itemComponent"));
        window.dispatchEvent(new Event("ItemComponentEditorInputSent_"+values.index));
    }

    useEffect(() => {
        function SetVars(){
            var dict = Utils.GetCurrentItemDict()["ItemComponent_"+values.index];
            if (dict != undefined && dict != null && dict[values.path] != undefined) {
                var newComps = []
                for (var i = 0; i < Object.keys(dict[values.path]).length; i++){
                    newComps.push(<ComponentListElement index={values.index} path={values.path} place={Object.keys(dict[values.path])[i].substring(1)} components={values.components}/>)
                }
                SetComponents(newComps)
                window.dispatchEvent(new Event("itemComponent"));
            }
        }

        if (IsFirstRender){
            SetVars()
        }

        window.addEventListener("ComponentListElementRemoved_"+values.index, SetVars);
        return () => {
          window.removeEventListener("ComponentListElementRemoved_"+values.index, SetVars);
        };

    }, [Object.keys[Utils.GetCurrentItemDict()["ItemComponent_"+values.index]]])

    return(
        <>
            <div class="ComponentListTopBar">
                <h3 style={{color:"#212020", fontSize:"20px"}}>{values.title}</h3>
            </div>
            <div class="ComponentList" style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                {components}
                <button class="ComponentListToolbarButton" onClick={AddElement} type="button" style={{alignSelf:"center", pointerEvents:"auto"}}>+</button>
            </div>
        </>

    )
}

export default ComponentList