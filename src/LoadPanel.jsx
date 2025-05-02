import { useEffect, useState, SetState } from "react";
import Utils from "./Utils";
import ColorPalette from "./ColorPalette";
import './index.css'
import './LoadPanel.css'
import RemoveButton from "./RemoveButton";
import MoveLoadPanelButton from "./MoveLoadPanelButton";
import ItemTemplateCatalogue from "./ItemTemplateCatalogue";


function LoadPanel(){

    const [visible, SetVisibility] = useState(false)

    useEffect( () => {

        function displayInfo(){
            SetVisibility(true)
        }

        window.addEventListener("displayLoadPanel", displayInfo);
        return () => {
            window.removeEventListener("displayLoadPanel", displayInfo);
        };
    }, [])

    function off(){
        SetVisibility(false)
    }

    function GetCompPanels(){
        var comps =  []

        var tab = localStorage.getItem("CurrentLoadTab")
        var arr = JSON.parse(localStorage.getItem("Items"))

        if (tab == "Templates") arr = ItemTemplateCatalogue.VanillaTemplates

        if (arr == null) return

        const GetCompButtons = (num) => {
            var returnComps = []
            var newArr = arr.slice((10 * num), Math.min(10 * (num + 1), arr.length))
            newArr.forEach(e => {
                var color = JSON.parse(localStorage.getItem(e))["ColorPalette"]
                returnComps.push(
                    <div className="loadPanelButton" onClick={elem => {EditItem(e); elem.stopPropagation()}} style={{
                        backgroundColor: color == undefined? ColorPalette.GetColor("TitlePanel", "Weapon") : 
                            ColorPalette.GetColor("TitlePanel", color, color == "Custom"? JSON.parse(localStorage.getItem(e))["CustomColor"] ?? "#ffffff"  : null),
                        margin:"2px",
                        style:"flex"
                    }}>
                        <h3 className="loadPanelButtonText shift" style={{
                            color: ColorPalette.GetColor("TitleText"),
                            textShadow:"2pt 2pt 0pt "+ (color == undefined? ColorPalette.GetColor("TitleShadowText", "Weapon") : 
                            ColorPalette.GetColor("TitleShadowText", color, color == "Custom"? JSON.parse(localStorage.getItem(e))["CustomColor"] ?? "#ffffff" : null))
                        }} dangerouslySetInnerHTML={Utils.markdown(JSON.parse(localStorage.getItem(e))["ItemName"])}/>
                        <div style={{display:"flex", flexDirection:"column"}}>
                            <MoveLoadPanelButton direction="up" item={e} col={color} customColor={JSON.parse(localStorage.getItem(e))["CustomColor"] ?? "#ffffff"}/>
                            <MoveLoadPanelButton direction="down" item={e} col={color} customColor={JSON.parse(localStorage.getItem(e))["CustomColor"] ?? "#ffffff"}/>
                        </div>                     
                        <RemoveButton item={e} col={color} customColor={JSON.parse(localStorage.getItem(e))["CustomColor"] ?? "#ffffff"}/>
                    </div>)
            });

            return returnComps 
        }

        const GetTemplateCompButtons = (num, array) => {
            var returnComps = []
            var newArr = Object.fromEntries(Object.entries(array).slice((10 * num), Math.min(10 * (num + 1), Object.keys(array).length)))
            
            Object.entries(newArr).map(([k, v]) => {
                var color = v[0]

                returnComps.push(
                    <div className="loadPanelButton" onClick={elem => {CopyItem(k); elem.stopPropagation()}} style={{
                        backgroundColor: color == undefined? ColorPalette.GetColor("TitlePanel", "Weapon") : 
                            ColorPalette.GetColor("TitlePanel", color, color == "Custom"? v[1] ?? "#ffffff"  : null),
                        padding:"5px",
                        margin:"2px",
                        width:"200px",
                        style:"flex",
                    }}>
                        <h3 className="loadPanelButtonText" style={{
                            color: ColorPalette.GetColor("TitleText"),
                            textShadow:"2pt 2pt 0pt "+ (color == undefined? ColorPalette.GetColor("TitleShadowText", "Weapon") : 
                            ColorPalette.GetColor("TitleShadowText", color, color == "Custom"? v[1] ?? "#ffffff" : null))
                        }} dangerouslySetInnerHTML={Utils.markdown(k)}/>
                    </div>)
            })

            return returnComps 
        }

        const GetTemplateCategoryDivs = () => {
            var divs = []

            const GetDivs = (k) => {
                var pushComps = []

                for (var i = 0; i <= Math.floor(Object.keys(arr[k]).length / 10) ; i++){
                    pushComps.push(
                        <div style={{display:"flex", flexDirection:"column", height:"100%"}}>
                            {GetTemplateCompButtons(i, arr[k])}
                        </div>
                    )
                }                
                return pushComps
            }

            Object.keys(arr).forEach(key => {
                divs.push(
                    <div style={{display:"flex",marginLeft:"10px", marginRight:"10px", flexDirection:"column", width:"100%", height:"100%"}}>
                        <h3 style={{fontFamily:"Retail", fontSize:"42px", color:ColorPalette.GetColor("TitleText")}}>{key}</h3> 
                        <div style={{display:"flex", flexDirection:"row", flex: "1 0 auto"}}>
                            {GetDivs(key)}
                        </div>
                    </div>
                )
            })
            return divs
        }

        if (tab == "Default" || tab == undefined || tab == null){
            for (var i = 0; i <= Math.floor(arr.length / 10) ; i++){
                comps.push(
                    <div style={{display:"flex", flexDirection:"column", height:"100%"}}>
                        {GetCompButtons(i)}
                    </div>
                )
            }
        }
        else{
            for (var i = 0; i <= Math.floor(Object.keys(arr).length / 10) ; i++){
                comps.push(
                    <div style={{display:"flex", flexDirection:"row", height:"100%"}}>
                        {GetTemplateCategoryDivs()}
                    </div>
                )
            }
        }

        return comps
    }

    function EditItem(itemName){
        localStorage.setItem("CurrentItem", itemName)
        off()
        window.dispatchEvent(new Event("itemComponent"))
        return
    }

    function CopyItem(path){
        var itemData = ItemTemplateCatalogue.TemplateFiles[path]
        var newItem = crypto.randomUUID()
        localStorage.setItem("CurrentItem", newItem)
        itemData = Utils.JumblePartNames(itemData)
        localStorage.setItem(newItem, JSON.stringify(itemData))

        var items = JSON.parse(localStorage.getItem("Items"))
        if (!items.includes(newItem)) items.push(newItem)
        localStorage.setItem("Items", JSON.stringify(items))

        off()
        window.dispatchEvent(new Event("itemComponent"))
    }

    function SetTab(name){
        localStorage.setItem("CurrentLoadTab", name)
        window.dispatchEvent(new Event("itemComponent"))
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
                height:"88%",
                width: "80%",
                justifySelf:"center",
                alignSelf:"center",
                padding: "12px",
                paddingBottom:"20px",
                borderRadius: "8px",
            }}>
                <div style={{display:"flex"}}>
                    <h3 style={{color:"#efdfbf", marginRight:"20px"}}>Select item</h3>
                    <button class={localStorage.getItem("CurrentLoadTab") == "Default" || localStorage.getItem("CurrentLoadTab") == undefined? "DarkButton active" : "DarkButton"} onClick={e => {SetTab("Default"); e.stopPropagation()}} style={{height:"50px", width:"100px", alignSelf:"center"}}>Your Items</button>
                    <button class={localStorage.getItem("CurrentLoadTab") == "Templates"? "DarkButton active" : "DarkButton"} onClick={e => {SetTab("Templates"); e.stopPropagation()}} style={{height:"50px", width:"100px", alignSelf:"center"}}>Templates</button>
                </div>
                <hr style={{width:"100%", color:"#efdfbf"}}/>
                <div style={{
                    display: "flex",                   
                    flexDirection:"row",
                    cursor:"auto",
                    overflowX:"scroll",
                    overflowY:"auto",
                    height:"100%"
                }}>
                    {GetCompPanels()}
                </div>
            </div>
        </div>
    )
}

export default LoadPanel