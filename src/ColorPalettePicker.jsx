import { useEffect, useState, useRef } from "react";
import Utils from "./Utils";

function ColorPalettePicker(){

    const[visibleColorPicker, SetColorPickerVisibility] = useState("hidden")
    const[customColor, SetCustomColor] = useState("#ffffff")
    const[colorPalette, SetColorPalette] = useState("Weapon")
    const IsFirstRender = useRef(true)

    useEffect(() => {
        if (IsFirstRender){
            SetColorPickerVisibility(Utils.GetCurrentItemDict()["ColorPalette"] == "Custom"? "visible" : "hidden")
            SetCustomColor(Utils.GetCurrentItemDict()["CustomColor"] == undefined ? "#ffffff" : Utils.GetCurrentItemDict()["CustomColor"])
            SetColorPalette(Utils.GetCurrentItemDict()["ColorPalette"] == undefined ? "Weapon" : Utils.GetCurrentItemDict()["ColorPalette"])
        }

        function SetColorPicker(){
            SetColorPickerVisibility(Utils.GetCurrentItemDict()["ColorPalette"] == "Custom"? "visible" : "hidden")
            SetCustomColor(Utils.GetCurrentItemDict()["CustomColor"] == undefined ? "#ffffff" : Utils.GetCurrentItemDict()["CustomColor"])
            SetColorPalette(Utils.GetCurrentItemDict()["ColorPalette"] == undefined ? "Weapon" : Utils.GetCurrentItemDict()["ColorPalette"])
        }

        window.addEventListener("itemComponent", SetColorPicker);
        return () => {
          window.removeEventListener("itemComponents", SetColorPicker);
        };

    }, [IsFirstRender, localStorage.getItem("CurrentItem"), Utils.GetCurrentItemDict()["ColorPalette"]])


    function ChangeColor(element){
        Utils.SetCurrentItemDictKey("ColorPalette", element.target.value)
        window.dispatchEvent(new Event("itemComponent"));

        if (element.target.value == "Custom") SetColorPickerVisibility("visible")
        else SetColorPickerVisibility("hidden")
    }

    function ChangeCustomColor(element){
        Utils.SetCurrentItemDictKey("CustomColor", element.target.value)
        SetCustomColor(element.target.value)
        window.dispatchEvent(new Event("itemComponent"));
    }

    return(
        <div style={{alignSelf:"center", paddingLeft:"24px", display:"flex"}}>
            <label style={{paddingRight:"12px", whiteSpace:"nowrap", alignSelf:"center"}}>Color Palette:</label>
            <select name="ColorPaletteType" id="customcolorinput" value={colorPalette} onChange={e => ChangeColor(e)}>
                <option value="Weapon">Weapon</option>
                <option value="Vitality">Vitality</option>
                <option value="Spirit">Spirit</option>
                <option value="Custom">Custom</option>
            </select>
            <input type="color" id="customcolorpicker" value={customColor} onChange={e => ChangeCustomColor(e)} style={{visibility:visibleColorPicker, width:"50px"}}></input>
        </div>
    )
}

export default ColorPalettePicker