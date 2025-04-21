import { useEffect, useState, useRef } from "react"
import Utils from "./Utils"
import ComponentList from "./ComponentList"
import IconSelector from "./IconSelector"
function ComponentListElement(values){

    const IsFirstRender = useRef(true)
    const[components, SetComponents] = useState([])
    const[visible, SetVisibility] = useState(true)


    useEffect(() => {
        function SetVars(){
            if(visible) SetComponents(GetComponents())
        }

        if(visible) SetComponents(GetComponents())

        if (IsFirstRender){
            SetVars()
        }

        window.addEventListener("ItemComponentEditorInputSent_"+values.index, SetVars);
        return () => {
          window.removeEventListener("ItemComponentEditorInputSent_"+values.index, SetVars);
        };

    }, [localStorage.getItem("ItemComponent_"+values.index), localStorage.getItem("ColorPalette"), localStorage.getItem("itemComponents")])

    function GetComponents(){
        if(!visible) return
        var ar = []
        var dict = Utils.GetCurrentItemDict()["ItemComponent_"+values.index];

        for(var i = 0; i < values.components.length; i++){
            var component = <></>
            switch(values.components[i]){
                case"Component_Title":
                    var defaultvar = ""                 
                    defaultvar = dict[values.path]["A"+values.place][0] == undefined? "" : dict[values.path]["A"+values.place][0]
                    component = <label>Component Title: <input type="text" name="Component_Title" maxLength="48" defaultValue={defaultvar}/><br/></label>
                    break;
                case"Component_Icon":
                    var defaultvar = ""
                    defaultvar = dict[values.path]["A"+values.place][1]
                    component =
                        <label>Component Icon: <div style={{display:"flex"}}>
                            <input name="Component_Icon" type="file" style={{width:"50%"}}/>
                            <IconSelector width="50%" path={values.path} place={values.place} index={values.index} arrayPlace={1} defaultValue={defaultvar}/>
                        </div></label>
                    break;
                case "Component_IconColor":
                    var defaultvar = ""
                    defaultvar = dict[values.path]["A"+values.place][2]
                    component = <label>Component Icon Color:
                        <select name="Component_IconColor" defaultValue={defaultvar} style={{pointerEvents:"auto"}}>
                            <option value="Weapon">Weapon</option>
                            <option value="Vitality">Vitality</option>
                            <option value="Spirit">Spirit</option>
                        </select> </label>
                    break;
                case"Stat_Title":
                    var defaultvar = "Weapon"
                    defaultvar = dict[values.path]["A"+values.place][0]
                    component = <input type="text" name="Stat_Title" maxLength="48" defaultValue={defaultvar}/>
                    break;
                case"ComponentOf_Title":
                    var defaultvar = ""
                    defaultvar = dict[values.path]["A"+values.place][0]
                    component = <label>Component Title: <input type="text" name="ComponentOf_Title" maxLength="48" defaultValue={defaultvar}/></label>
                    break;
                case"ComponentOf_Icon":
                    var defaultvar = ""
                    defaultvar = dict[values.path]["A"+values.place][1]
                    component = 
                        <label>Component Icon: <div style={{display:"flex"}}> 
                            <input name="ComponentOf_Icon" type="file" style={{width:"50%"}}/>
                            <IconSelector width="50%" path={values.path} place={values.place} index={values.index} arrayPlace={1} defaultValue={defaultvar}/>
                        </div></label>
                    break;
                case "ComponentOf_IconColor":
                    var defaultvar = ""
                    defaultvar = dict[values.path]["A"+values.place][2]
                    component = <label>Component Icon Color: <br/>
                        <select name="ComponentOf_IconColor" defaultValue={defaultvar} style={{pointerEvents:"auto"}}>
                            <option value="Weapon">Weapon</option>
                            <option value="Vitality">Vitality</option>
                            <option value="Spirit">Spirit</option>
                        </select> </label>
                    break;
                case"StatTableCell_Type":
                    var defaultvar = ""
                    defaultvar = dict[values.path]["A"+values.place][0]
                    component = <div><label>Cell Type:
                        <select name="StatTableCell_Type" defaultValue={defaultvar} style={{pointerEvents:"auto"}}>
                            <option value="Cell">Cell</option>
                            <option value="List">List</option>
                        </select> </label>
                        {defaultvar == "List"?                                     
                            <>
                            <label><br/>Stat List: <textarea name="StatList" wrap="soft" rows={6} defaultValue={dict[values.path]["A"+values.place][1]} style={{pointerEvents:"auto"}}/></label><br/>
                            <label>Cell Width: <input name="CellWidth" type="number" min={0} defaultValue={dict[values.path]["A"+values.place][2]}/></label><br/>
                            <label>Columns: <input name="Columns" type="number" min={1} max={3} defaultValue={dict[values.path]["A"+values.place][9]}/></label><br/>
                            </>
                        :
                            <>
                            <label><br/>Icon: <div style={{display:"flex"}}>
                                <input name="Icon" type="file" style={{width:"50%"}}/>
                                <IconSelector width="50%" path={values.path} place={values.place} index={values.index} arrayPlace={3} defaultValue={dict[values.path]["A"+values.place][3]}/>
                                </div></label>
                            <label>Icon Color:
                                <select name="IconColor" defaultValue={dict[values.path]["A"+values.place][4]} style={{pointerEvents:"auto"}}>
                                    <option value="Weapon">Weapon</option>
                                    <option value="Vitality">Vitality</option>
                                    <option value="Spirit">Spirit</option>
                                    <option value="Gray">Gray</option>
                                    <option value="Soul">Soul</option>
                                    <option value="Red">Red</option>
                                    <option value="Yellow">Yellow</option>
                                </select> </label>
                            <label><br/>Top Text: <input name="TopText" defaultValue={dict[values.path]["A"+values.place][5]}/></label><br/>
                            <label>Middle Text: <input name="MiddleText" defaultValue={dict[values.path]["A"+values.place][6]}/></label><br/>
                            <label>Bottom Text:
                                <select name="BottomText" defaultValue={dict[values.path]["A"+values.place][7]} style={{pointerEvents:"auto"}}>
                                    <option value="None">None</option>
                                    <option value="Conditional">Conditional</option>
                                    <option value="Custom">Custom</option>
                                </select> </label><br/>
                            {dict[values.path]["A"+values.place][7] == "Custom"? <label><br/>Custom Bottom Text: <input name="CustomBottomText" defaultValue={dict[values.path]["A"+values.place][8]}/></label> : ""}
                            <label><br/>Cell Width: <input name="CellWidth" type="number" min={1} defaultValue={dict[values.path]["A"+values.place][2]}/></label><br/>
                            <label>Scaling Type:
                                <select name="ScalingType" defaultValue={dict[values.path]["A"+values.place][10]} style={{pointerEvents:"auto"}}>
                                    <option value="None">None</option>
                                    <option value="Spirit">Spirit</option>
                                    <option value="Melee">Melee</option>
                                    <option value="Weapon">Weapon</option>
                                    <option value="Health">Health</option>
                                    <option value="Custom">Custom</option>
                            </select> </label>
                            <div style={{display:dict[values.path]["A"+values.place][10] == "Custom"? "block" : "none", flexDirection:"row"}}>
                                <label>Icon: <input name="CustomScalingIcon" type="file"/></label>
                                <label>Color: <input name="CustomScalingColor" type="color" defaultValue={dict[values.path]["A"+values.place][12]}/></label>
                            </div>
                            {dict[values.path]["A"+values.place][10] != "None" && dict[values.path]["A"+values.place][10] != undefined? <label><br/>ScalingAmount: <input name="ScalingAmount" maxLength="12" defaultValue={dict[values.path]["A"+values.place][13]}/></label> : ""}
                            </>
                        }
                        </div>
                    break;
            }
            ar.push(component)
        }
        return ar
    }

    function RemoveSelf(){
        var dict = Utils.GetCurrentItemDict()["ItemComponent_"+values.index];
        delete dict[values.path]["A"+values.place]
        Utils.SetCurrentItemDictKey("ItemComponent_"+values.index, dict)

        window.dispatchEvent(new Event("ComponentListElementRemoved_"+values.index));
        window.dispatchEvent(new Event("ItemComponentEditorInputSent_"+values.index));
        window.dispatchEvent(new Event("itemComponent"));
        SetVisibility(false)
    }

    function SaveData(formInput){

        var dict = Utils.GetCurrentItemDict()["ItemComponent_"+values.index]
        var arrayPlace = 0
        switch(formInput.target.name){
            case"Component_Title": arrayPlace = 0; break;
            case"Component_Icon": arrayPlace = 1; break;
            case"Component_IconColor": arrayPlace = 2; break;
            case"ComponentOf_Title": arrayPlace = 0; break;
            case"ComponentOf_Icon": arrayPlace = 1; break;
            case"ComponentOf_IconColor": arrayPlace = 2; break;
            case"StatTableCell_Type": arrayPlace = 0; break;
            case"StatList": arrayPlace = 1; break;
            case"Columns": arrayPlace = 9; break;
            case"CellWidth": arrayPlace = 2; break;
            case"Icon": arrayPlace = 3; break;
            case"IconColor": arrayPlace = 4; break;
            case"TopText": arrayPlace = 5; break;
            case"MiddleText": arrayPlace = 6; break;
            case"BottomText": arrayPlace = 7; break;
            case"CustomBottomText": arrayPlace = 8; break;
            case"ScalingType": arrayPlace = 10; break;
            case"CustomScalingIcon": arrayPlace = 11; break;
            case"CustomScalingColor": arrayPlace = 12; break;
            case"ScalingAmount": arrayPlace = 13; break;
        }
        
        var input = formInput.target.value
        if (formInput.target.type == "file"){
            input = URL.createObjectURL(formInput.target.files[0])
        }

        Utils.SetDictionaryArray(dict, values.path+".A"+values.place, input, arrayPlace)
        Utils.SetCurrentItemDictKey("ItemComponent_"+values.index, dict)
        window.dispatchEvent(new Event("ItemComponentEditorInputSent_"+values.index));
        window.dispatchEvent(new Event("itemComponent"));
        formInput.stopPropagation();

    }

    return(
        <>
            <div className="VBox" key={values.path+values.place} style={{justifyContent:"space-between"}}>
                <div>
                    <form onChange={SaveData}>
                        {components}
                    </form>
                </div>
                <div style={{alignContent:"center"}}>
                    <button className="ComponentListToolbarButton" type="button" onClick={RemoveSelf} style={{pointerEvents:"auto", width:"50px", marginLeft:"12px"}}>-</button>
                </div>
            </div>
            <hr style={{width:"100%", color:"#efdfbf"}}/>
        </>
    )
}

export default ComponentListElement