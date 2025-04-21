import { useEffect, useState, SetState } from "react";
import Utils from "./Utils";
import ColorPalette from "./ColorPalette";
import './index.css'
import './LoadPanel.css'
import RemoveButton from "./RemoveButton";

function LoadPanel(){

    const [visible, SetVisibility] = useState(false)
    const [components, SetComponents] = useState([])

    useEffect( () => {

        function displayInfo(){
            SetVisibility(true)
            SetCompPanels()
        }

        window.addEventListener("displayLoadPanel", displayInfo);
        return () => {
            window.removeEventListener("displayLoadPanel", displayInfo);
        };
    }, [])

    function off(){
        SetVisibility(false)
    }

    function SetCompPanels(){
        var comps =  []
        var arr = JSON.parse(localStorage.getItem("Items"))
        arr.forEach(e => {
            var color = JSON.parse(localStorage.getItem(e))["ColorPalette"]
            comps.push(
                <div className="loadPanelButton" onClick={elem => {EditItem(e); elem.stopPropagation()}} style={{
                    backgroundColor: color == undefined? ColorPalette.GetColor("TitlePanel", "Weapon") : 
                        ColorPalette.GetColor("TitlePanel", color, color == "Custom"? JSON.parse(localStorage.getItem(e))["CustomColor"] ?? "#ffffff"  : null),
                }}>
                    <h3 className="loadPanelButtonText" style={{
                        color: ColorPalette.GetColor("TitleText"),
                        textShadow:"2pt 2pt 0pt "+ (color == undefined? ColorPalette.GetColor("TitleShadowText", "Weapon") : 
                        ColorPalette.GetColor("TitleShadowText", color, color == "Custom"? JSON.parse(localStorage.getItem(e))["CustomColor"] ?? "#ffffff" : null))
                    }} dangerouslySetInnerHTML={Utils.markdown(JSON.parse(localStorage.getItem(e))["ItemName"])}/>
                    <RemoveButton item={e} col={color} customColor={JSON.parse(localStorage.getItem(e))["CustomColor"] ?? "#ffffff"}/>
                </div>
            )
        });
        SetComponents(comps)
    }

    function EditItem(itemName){
        localStorage.setItem("CurrentItem", itemName)
        off()
        window.dispatchEvent(new Event("itemComponent"))
        return
    }

    return(
        <div className="infoOverlay" style={{
            display: visible ? "flex" : "none",
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: '10',
            cursor: 'pointer',
            justifyContent:"center",
        }} onClick={off}>
            <div onClick={e =>{e.stopPropagation();}} style={{
                display:"flex",
                flexDirection: "column",
                backgroundColor: '#212020',
                cursor:"auto",
                maxHeight:"100%",
                maxWidth: "80%",
                justifySelf:"center",
                alignSelf:"center",
                padding: "12px",
                paddingBottom:"20px",
                borderRadius: "8px",
            }}>
                <div style={{display:"flex"}}>
                    <h3 style={{color:"#efdfbf", marginRight:"20px"}}>Select item</h3>
                </div>
                <hr style={{width:"100%", color:"#efdfbf"}}/>
                <div style={{
                    display: "grid",                   
                    gridTemplateColumns: "repeat("+ Math.ceil(components.length / 10) +", auto)",
                    gridTemplateRows: "repeat(10, auto)",
                    rowGap: "5px",
                    columnGap: "5px",
                    zIndex: '10',
                    cursor:"auto",
                    max:"500px",
                    overflowX:"scroll",
                    overflowY:"auto",
                }}>
                    {components}
                </div>
            </div>
        </div>
    )
}

export default LoadPanel