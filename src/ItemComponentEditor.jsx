import { useEffect, useState } from "react"
import ComponentList from "./ComponentList"
import Utils from "./Utils"
import IconSelector from "./IconSelector"

function ItemComponentEditor(values){

    const[enabled, ChangedEnabled] = useState(true)
    const[open, ChangeOpen] = useState(false)
    const[justCreated, SetCreation] = useState(true)
    const[partComponents, SetPartComponents] = useState([])

    function DeleteElement(element){
        var comps = Utils.GetCurrentItemDict()
        delete comps["itemComponents"][values.index]
        delete comps["ItemComponent_"+values.index]
        Utils.SetCurrentItemDict(comps)

        window.dispatchEvent(new Event("itemComponent"));

        element.stopPropagation();
    }

    useEffect(() => {
        setParts()

        if (enabled == false) return       
    
        let bottomDiv = document.getElementById("bottomDiv"+values.index+values.itemID)
        let topDiv = document.getElementById("topDiv"+values.index+values.itemID)
        let arrow = document.getElementById("topDivArrow"+values.index+values.itemID)    
        let upArrow = document.getElementById("moveUpArrow"+values.index+values.itemID)    
        let downArrow = document.getElementById("moveDownArrow"+values.index+values.itemID)    
    

        if (justCreated == true){
            if (open){
                bottomDiv.style.animation = ""
                topDiv.style.animation = ""
                arrow.style.animation = ""
                SetCreation(false)
            }
            else{
                bottomDiv.style.animation = "unset"
                topDiv.style.animation = "unset"
                arrow.style.animation = "unset"
            }
        }

        if(open){
            bottomDiv.style.animationName = "OpenBottomDiv"
            bottomDiv.style.maxHeight = "5000px"
            bottomDiv.style.paddingTop = "24px"

            topDiv.style.animationName = "OpenTopDiv"
            topDiv.style.backgroundColor = "#efdfbf"       
            topDiv.style.borderBottomLeftRadius = "0px"
            topDiv.style.borderBottomRightRadius = "0px"
            topDiv.style.color = "#212020"

            arrow.style.animationName = "OpenArrow"
            arrow.style.transform = "rotate(90deg)"
            arrow.style.borderLeftColor = "#212020"

            upArrow.style.borderLeftColor = "#212020"
            downArrow.style.borderLeftColor = "#212020"
        }
        else{
            bottomDiv.style.animationName = "CloseBottomDiv"
            bottomDiv.style.maxHeight = "0px"
            bottomDiv.style.paddingTop = "0px"

            topDiv.style.animationName = "CloseTopDiv"
            topDiv.style.backgroundColor = "#212020"
            topDiv.style.borderBottomLeftRadius = "8px"
            topDiv.style.borderBottomRightRadius = "8px"
            topDiv.style.color = "#efdfbf"

            arrow.style.animationName = "CloseArrow"
            arrow.style.transform = "rotate(0deg)"
            arrow.style.borderLeftColor = "#efdfbf" 

            upArrow.style.borderLeftColor = "#efdfbf" 
            downArrow.style.borderLeftColor = "#efdfbf" 

        }

        window.addEventListener("itemComponent", setParts);
        return () => {
          window.removeEventListener("itemComponent", setParts);
        };
    }, [enabled, open])

    function ArrowButtonPress(){

        if (open == false) ChangeOpen(true)
        else ChangeOpen(false)

    }

    function setParts(){
        var dict = Utils.GetCurrentItemDict()["ItemComponent_"+values.index];
        if (dict == null) return
        switch(values.title){
            case "Title":
                SetPartComponents( [
                    <label>Title: <input name="Title" maxLength="48" defaultValue={dict["Title"]}/><br/></label>,
                    <label>Cost: <input name="Cost" maxLength="48" defaultValue={dict["Cost"]}/><br/></label>,
                    <label>Cost Type:
                        <select name="CostType" defaultValue={dict["CostType"]} style={{pointerEvents:"auto", width:"50%"}}>
                            <option value="Soul">Soul</option>
                            <option value="Gold">Gold</option>
                            <option value="Custom">Custom</option>
                    </select><br/></label>,
                    dict["CostType"] == "Custom"? <label>• Cost Icon: <IconSelector width="50%" path="CostIcon" place={null} index={values.index} arrayPlace={3} defaultValue={dict["CostIcon"]}/></label> : "",
                    dict["CostType"] == "Custom"? <><input name="CostColor" type="color" style={{height:"40px", position:"relative", top:"5px"}} defaultValue={dict["CostColor"]}/><br/></> : "",
                    dict["CostType"] == "Custom"? <label>• Cost Icon Scale: <input name="CostIconScale" type="number" min={0} step={0.1} defaultValue={dict["CostIconScale"]}/><br/></label> : "",
                    <label>Side Stat:
                    <select name="SideStat" defaultValue={dict["SideStat"]} style={{pointerEvents:"auto", width:"50%"}}>
                        <option value="None">None</option>
                        <option value="Self">Self</option>
                        <option value="Weapon">Weapon</option>
                        <option value="Spirit">Spirit</option>
                        <option value="Vitality">Vitality</option>
                        <option value="Custom">Custom</option>
                    </select><br/></label>,
                    dict["SideStat"] != "None" && dict["SideStat"] != undefined && dict["SideStat"] != "Custom"? 
                    <label>• Stat Tier:<select name="SideStatAmount" defaultValue={dict["SideStatAmount"]} style={{pointerEvents:"auto", width:"50%"}}>
                        <option value="T1">Tier 1</option>
                        <option value="T2">Tier 2</option>
                        <option value="T3">Tier 3</option>
                        <option value="T4">Tier 4</option>
                        <option value="Custom">Custom</option>
                    </select><br/></label> : "",
                    dict["SideStat"] == "Custom" || (Utils.GetCurrentItemDict()["ColorPalette"] == "Custom" & dict["SideStat"] == "Self")? <label>• Stat Icon: <IconSelector width="50%" path="SideStatCustomIcon" place={null} index={values.index} arrayPlace={3} defaultValue={dict["SideStatCustomIcon"]}/></label>: "",
                    dict["SideStat"] == "Custom" || (Utils.GetCurrentItemDict()["ColorPalette"] == "Custom" & dict["SideStat"] == "Self")? <><input name="SideStatCustomIconColor" type="color" style={{height:"40px", position:"relative", top:"5px"}} defaultValue={dict["SideStatCustomIconColor"]}/><br/></> : "",
                    dict["SideStat"] == "Custom" || (Utils.GetCurrentItemDict()["ColorPalette"] == "Custom" & dict["SideStat"] == "Self")? <label>• Panel Color: <input name="SideStatPanelColor" type="color" style={{height:"40px", position:"relative", top:"5px"}} defaultValue={dict["SideStatPanelColor"]}/><br/></label>: "",
                    dict["SideStatAmount"] == "Custom" || dict["SideStat"] == "Custom" || (Utils.GetCurrentItemDict()["ColorPalette"] == "Custom" & dict["SideStat"] == "Self")? <label>• Custom Stat: <input name="SideStatTopPanelText" maxLength="24" defaultValue={dict["SideStatTopPanelText"]}/><br/></label>: "",
                    dict["SideStat"] == "Custom" || (Utils.GetCurrentItemDict()["ColorPalette"] == "Custom" & dict["SideStat"] == "Self")? <label>• Bottom Panel Text: <input name="SideStatBottomPanelText" maxLength="24" defaultValue={dict["SideStatBottomPanelText"]}/><br/></label>: "",
                    
                ])
                break
            case "Components":
                SetPartComponents( [
                    <ComponentList title="" path="Components" index={values.index} components={["Component_Title", "Component_Icon", "Component_IconColor"]}/>
                ])
                break
            case "Stats":
                SetPartComponents( [
                    <label>Stats: <textarea name="Stats" wrap="soft" rows={6} defaultValue={dict["Stats"]} style={{pointerEvents:"auto"}}/></label>
                    //<ComponentList title="" path="Stats" index={values.index} components={["Stat_Title"]}/>
                ])
                break
            case "Cooldown":
                SetPartComponents( [
                    <label>Cooldown Type:
                        <select name="CooldownType" defaultValue={dict["CooldownType"]} style={{pointerEvents:"auto", width:"100%"}}>
                            <option value="Passive">Passive</option>
                            <option value="Active">Active</option>
                            <option value="Custom">Custom</option>
                    </select> </label>,
                    dict["CooldownType"] == "Custom"? <label>Custom Cooldown Text: <input name="CooldownCustomText" maxLength="64" defaultValue={dict["CooldownCustomText"]}/></label> : <></>,
                    <label>Enable Cooldown: <input name="CooldownEnabled" defaultChecked={dict["CooldownEnabled"] == "true" ? true : false} type="checkbox"/></label>,
                    dict["CooldownEnabled"] == "true"? <label>Cooldown: <input name="Cooldown" maxLength="10" defaultValue={dict["Cooldown"]}/></label> : ""
                ])
                break
            case "Description":
                SetPartComponents( [
                    <label>Description: <textarea name="Description" wrap="soft" rows={6} defaultValue={dict["Description"]} style={{pointerEvents:"auto"}}/></label>,
                ])
                break
            case "ComponentOf":
                SetPartComponents( [
                    <ComponentList title="" path="ComponentsOf" index={values.index} components={["ComponentOf_Title", "ComponentOf_Icon", "ComponentOf_IconColor"]}/>
                ])
                break
            case "StatTableRow":
                SetPartComponents( [
                    <ComponentList title="" path="StatTableCell" index={values.index} components={["StatTableCell_Type"]}/>
                ])
                break
        }
    }

    function InputChanged(formData){
        setParts()
        var dict = {}
        if (Utils.GetCurrentItemDict()["ItemComponent_"+values.index] !== null && Utils.GetCurrentItemDict()["ItemComponent_"+values.index] != "{}"){
            dict = Utils.GetCurrentItemDict()["ItemComponent_"+values.index]
        }

        var data = ""
        if (formData.target.type == "checkbox") data = formData.target.checked
        else data = formData.target.value


        dict[formData.target.name] = [data]
        Utils.SetCurrentItemDictKey("ItemComponent_"+values.index, dict)

        window.dispatchEvent(new Event("ItemComponentEditorInputSent_"+values.index));
        window.dispatchEvent(new Event("itemComponent"));
    }
    
    function MoveElement(element,direction){
        setParts()
        var dict = Utils.GetCurrentItemDict()["itemComponents"]
        var newdict = {}

        var index = 0
        for (var i = 0; i < Object.keys(dict).length; i++){
            if (Object.keys(dict)[i] == values.index) {
                index = i
                break;
            }
        }

        var keys = Object.keys(dict)
        if (direction == 0 && index != keys.length - 1) 
        {
            Utils.ArrayMove(keys,index,index+1)
        }
        else if (direction == 1 && index != 0)
        {
            Utils.ArrayMove(keys,index,index-1)
        }

        for(var i = 0; i < keys.length; i++){
            newdict[keys[i]] = dict[keys[i]]
        }

        Utils.SetCurrentItemDictKey("itemComponents", newdict)

        window.dispatchEvent(new Event("ItemComponentEditorInputSent_"+values.index));
        window.dispatchEvent(new Event("itemComponent"));
        element.stopPropagation();
    }

    if (enabled == false) return
    else return(
        <>
            <div className="topPartDiv" id={"topDiv"+values.index+values.itemID} onClick={ArrowButtonPress}>
                <h4 className="NoHighlight" style={{marginRight:"auto"}}>{values.title}</h4>
                <i className="DivArrowUp" id={"moveUpArrow"+values.index+values.itemID} onClick={e => MoveElement(e,0)}/> 
                <i className="DivArrowDown" id={"moveDownArrow"+values.index+values.itemID} onClick={e => MoveElement(e,1)}/> 
                <i className="topDivX NoHighlight" id={"topDivX"+values.index+values.itemID} onClick={element => DeleteElement(element)}>X</i>
                <i className="topDivArrow" id={"topDivArrow"+values.index+values.itemID}/>              
            </div>
            <div className="bottomPartDiv" id={"bottomDiv"+values.index+values.itemID}>
                <form onChange={InputChanged}>
                {partComponents}
                </form>
            </div>
        </>
    )
}

export default ItemComponentEditor