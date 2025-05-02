import { useState, useEffect, useRef } from "react";
import SoulIcon from "./assets/icons/icon_soul.svg"
import GoldIcon from "./assets/icons/Gold.svg"
import CooldownIcon from "./assets/icons/cooldown.svg"
import Utils from "./Utils";
import './index.css'
import ColorPalette from "./ColorPalette";

function ItemComponent(values){

    const IsFirstRender = useRef(true)
    const [checkState, SetCheckState] = useState(true)
    var setterFunctions = {}

    useEffect(() => {
        function SetVars(){
            var dict = Utils.GetCurrentItemDict()["ItemComponent_"+values.index]
            if (dict == null) return
            Object.entries(setterFunctions).map(([k, v]) => {
                v(dict[k])
            })
            SetCheckState(true)
        }
    
        if (IsFirstRender){
            SetVars()
        }

        window.addEventListener("ItemComponentEditorInputSent_"+values.index, SetVars);
        window.addEventListener("itemComponent", SetVars);
        return () => {
            window.removeEventListener("ItemComponentEditorInputSent_"+values.index, SetVars);
            window.removeEventListener("itemComponent", SetVars);
    };}, [])

    //HOOKS
    var [title, SetTitle] = useState("Title")
    var [cost, SetCost] = useState("6,000")
    var [CostType, SetCostType] = useState("Soul")
    var [CostColor, SetCostColor] = useState("#ffffff")
    var [CostIcon, SetCostIcon] = useState("")
    var [CostIconScale, SetCostIconScale] = useState(1.0)
    var [SideStat, SetSideStat] = useState("none")
    var [SideStatAmount, SetSideStatAmount] = useState("T1")
    var [SideStatCustomIcon, SetSideStatCustomIcon] = useState([""])
    var [SideStatCustomIconColor, SetSideStatCustomIconColor] = useState(["#ffffff"])
    var [SideStatPanelColor, SetSideStatPanelColor] = useState("#ffffff")
    var [SideStatTopPanelText, SetSideStatTopPanelText] = useState([""])
    var [SideStatBottomPanelText, SetSideStatBottomPanelText] = useState([""])

    var [componentName, SetComponentName] = useState([""])
    var [componentIcon, SetComponentIcon] = useState([""])
    var [componentIconColor, SetComponentIconColor] = useState([""])
    var [componentIconCustomColor, SetComponentIconCustomColor] = useState(["#ffffff"])
    var [components, SetComponents] = useState([])

    var [Stats, SetStatTitle] = useState(["Stat Description"])

    var [cooldownType, SetcooldownType] = useState("Passive")
    var [cooldownCustomText, SetCooldownCustomText] = useState("Custom")
    var [cooldownEnabled, SetCooldownEnabled] = useState("false")
    var [cooldown, SetCooldown] = useState("1s")

    var [Description, SetDescription] = useState("Description")

    var [componentOfName, SetComponentOfName] = useState(["Component"])
    var [componentOfIcon, SetComponentOfIcon] = useState([""])
    var [ComponentOfIconColor, SetComponentOfIconColor] = useState([""])
    var [ComponentOfIconCustomColor, SetComponentOfIconCustomColor] = useState(["#ffffff"])
    var [componentsOf, SetComponentsOf] = useState([])

    var [ItemComponents, SetItemComponents] = useState([""])

    switch(values.title){
        //TITLE
        case "Title":
            setterFunctions = {
                "Title" : SetTitle,
                "Cost" : SetCost,
                "CostType" : SetCostType,
                "CostColor" : SetCostColor,
                "CostIcon" : SetCostIcon,
                "CostIconScale" : SetCostIconScale,
                "SideStat" : SetSideStat,
                "SideStatAmount" : SetSideStatAmount,
                "SideStatCustomIcon" : SetSideStatCustomIcon,
                "SideStatCustomIconColor" : SetSideStatCustomIconColor,
                "SideStatPanelColor" : SetSideStatPanelColor,
                "SideStatTopPanelText" : SetSideStatTopPanelText,
                "SideStatBottomPanelText" : SetSideStatBottomPanelText

            }
            
            function GetSideStatInfo(type = "Stat", palette = "None", tier){
                if (palette == "Self") {
                    palette = Utils.GetCurrentItemDict()["ColorPalette"] == undefined ? "Weapon" : Utils.GetCurrentItemDict()["ColorPalette"] 
                }
                if (palette == undefined) palette = "None"
                if (tier == undefined) tier = "T1"

                var topText = SideStatTopPanelText == undefined ? "" : SideStatTopPanelText[0]
                var botText = SideStatBottomPanelText == undefined ? "" : SideStatBottomPanelText[0]
                var icon = SideStatCustomIcon == undefined ? "" : SideStatCustomIcon[0]
                var col = SideStatCustomIconColor == undefined ? "#ffffff" : SideStatCustomIconColor[0]
                
                switch(type){
                    case "Stat": 
                        if (palette == "None") return ""
                        else if (palette == "Self") return ""
                        else if (palette == "Weapon") {
                            if (tier == "T1") return "**((+))[[6]]((%))**"
                            else if (tier == "T2") return "**((+))[[10]]((%))**"
                            else if (tier == "T3") return "**((+))[[14]]((%))**"
                            else if (tier == "T4") return "**((+))[[18]]((%))**"
                            else return topText
                        }
                        else if (palette == "Spirit") {
                            if (tier == "T1") return "**((+))[[4]]**"
                            else if (tier == "T2") return "**((+))[[8]]**"
                            else if (tier == "T3") return "**((+))[[12]]**"
                            else if (tier == "T4") return "**((+))[[16]]**"
                            else return topText
                        }
                        else if (palette == "Vitality") {
                            if (tier == "T1") return "**((+))[[11]]((%))**"
                            else if (tier == "T2") return "**((+))[[14]]((%))**"
                            else if (tier == "T3") return "**((+))[[17]]((%))**"
                            else if (tier == "T4") return "**((+))[[20]]((%))**"
                            else return topText
                        }
                        else return topText
                    case "Text" :
                        if (palette == "None") return ""
                        else if (palette == "Self") return ""
                        else if (palette == "Weapon") return "Weapon Damage"
                        else if (palette == "Spirit") return "Spirit Power"
                        else if (palette == "Vitality") return "Base Health"
                        else return botText
                    case "Icon" : 
                        if (palette == "None") return ""
                        else if (palette == "Self") return ""
                        else if (palette == "Weapon") return "./public/publicIcons/Stat/WeaponItem.svg"
                        else if (palette == "Spirit") return "./public/publicIcons/Stat/spiritPower.svg"
                        else if (palette == "Vitality") return "./public/publicIcons/Stat/VitalityItem.svg"
                        else return icon
                    case "IconColor" :
                        if (palette == "None") return ""
                        else if (palette == "Self") return ""
                        else if (palette == "Weapon") return ColorPalette.GetColor("TitlePanelStatIcon", palette)
                        else if (palette == "Spirit") return ColorPalette.GetColor("TitlePanelStatIcon", palette)
                        else if (palette == "Vitality") return ColorPalette.GetColor("TitlePanelStatIcon", palette)
                        else return col
                }
                return null
            }

            return(
                <div style={{
                    backgroundColor:ColorPalette.GetColor("TitlePanel"), 
                    width:"450px", 
                    height:"96px",
                    borderRadius:"7pt",
                    display:"flex",
                    flexDirection:"row",
                    borderTopLeftRadius: values.placement == 0 ? "7pt" : "0pt",
                    borderTopRightRadius: values.placement == 0 ? "7pt" : "0pt",
                    borderBottomLeftRadius: values.placement < (values.listSize - 1) ? "0pt" : "7pt",
                    borderBottomRightRadius: values.placement < (values.listSize - 1) ? "0pt" : "7pt"
                    }}>
                    <div style={{
                        display:"flex",
                        flexDirection:"column",
                        width:"100%"
                    }}>
                        <h3 style=
                        {{
                            color:ColorPalette.GetColor("TitleText"), 
                            fontSize:"20pt",
                            fontFamily:"Retail",
                            paddingLeft: "12pt",
                            paddingTop: "12.5pt",
                            textShadow:"1.5pt 1.5pt 0pt "+ColorPalette.GetColor("TitleShadowText"),
                        }}>{title}</h3>
                        <div style={{
                            display:"flex",
                            flexDirection:"row",
                            alignContent:"center",
                        }}>         
                            <div style={{
                                maskImage: CostType == "Soul" || CostType == undefined ? "url('./publicIcons/Stat/soul.svg')" : CostType == "Gold"? "url('./publicIcons/Stat/Gold.svg')" : "url("+CostIcon+")", 
                                maskSize: CostType != "Custom" ? "contain" : (16 * (CostIconScale ?? 1.0)) ,
                                maskRepeat:"no-repeat",
                                maskPosition:"center",
                                width: CostType == "Soul" || CostType == undefined ? "12px" : "16px",
                                marginLeft: "12pt",
                                marginTop: "2.5pt",
                                
                                backgroundColor: CostType == "Soul" || CostType == undefined ? "#9affd6" : CostType == "Gold"? "#ffd400" : CostColor ?? "#000000"}}>
                            </div>
                            <h3 style=
                            {{
                                color: CostType == "Soul" || CostType == undefined  ? "#9affd6" : CostType == "Gold"? "#ffd400" : CostColor ?? "#000000", 
                                fontSize:"19px",
                                fontFamily:"Retail",
                                paddingLeft: "3.6pt",
                                paddingTop:"1.1pt"
                            }}>{cost}</h3>
                        </div>
                    </div>
                    <div style={{
                        alignSelf:"center",
                        display: SideStat == "None" || SideStat == undefined? "none" : "flex",
                        flexDirection:"column",
                        marginRight:"20px",
                        paddingTop:"6px",
                        justifySelf:"flex-end"}}>
                            <div style={{
                                width:"90px", 
                                height:"25px",
                                display:"flex",
                                flexDirection:"row",
                                justifyContent:"center",
                                alignContent:"center",
                                backgroundColor:ColorPalette.GetColor("TitlePanelStatTop",
                                    SideStat == "Self"? Utils.GetCurrentItemDict()["ColorPalette"] : SideStat, 
                                    SideStat == "Custom"? SideStatPanelColor : SideStat == "Self" && Utils.GetCurrentItemDict()["ColorPalette"] != "Custom"? Utils.GetCurrentItemDict()["CustomColor"] : null)}}>
                                
                                <h3 style={{fontSize:"17px", fontFamily:"Retail", alignSelf:"center", textAlign:"center"}}
                                dangerouslySetInnerHTML={Utils.markdown(GetSideStatInfo("Stat", SideStat, SideStatAmount), SideStat != "Self" ? SideStat : Utils.GetCurrentItemDict()["ColorPalette"])}/>
                                <div style={{
                                    maskImage: "url('"+GetSideStatInfo("Icon", SideStat, SideStatAmount)+"')", 
                                    maskSize: "contain",
                                    maskPosition:"center",
                                    maskRepeat:"no-repeat",
                                    marginLeft:"4px",
                                    width:"15px", 
                                    height:"15px", 
                                    alignSelf:"center",   
                                    justifySelf:"center",                                
                                    backgroundColor: GetSideStatInfo("IconColor", SideStat, SideStatAmount)}}/>
                            </div>
                            <div style={{
                                width:"90px", 
                                backgroundColor:ColorPalette.GetColor("TitlePanelStatBottom",
                                    SideStat == "Self"? Utils.GetCurrentItemDict()["ColorPalette"] : SideStat, 
                                    SideStat == "Custom"? SideStatPanelColor : SideStat == "Self" && Utils.GetCurrentItemDict()["ColorPalette"] != "Custom"? Utils.GetCurrentItemDict()["CustomColor"] : null)}}>
                                <h3 style={{fontSize:"12px", paddingTop:"1px", paddingBottom:"1px", fontWeight:"500", fontFamily:"Retail", alignSelf:"center", textAlign:"center"}}
                                dangerouslySetInnerHTML={Utils.markdown(GetSideStatInfo("Text", SideStat, SideStatAmount), SideStat != "Self" ? SideStat : Utils.GetCurrentItemDict()["ColorPalette"])}/>
                            </div>
                    </div>
                </div>
            )
        break;
        //COMPONENTS
        case "Components":

            setterFunctions = {
                "Component Name" : CompName,
                "Component Icon" : CompIcon,
                "Component Icon Color" : CompIconCol,
                "Component Icon Custom Color" : CompIconCustomCol,
            }

            function CompName() {
                var dict = Utils.GetCurrentItemDict()["ItemComponent_"+values.index]
                if (dict["Components"] !== undefined){
                    var names = []
                    var vals = Object.values(dict["Components"])
                    vals.forEach(e => {
                        names.push(e[0])
                    })
                    SetComponentName(names)
                }
            }

            function CompIcon() {
                var dict = Utils.GetCurrentItemDict()["ItemComponent_"+values.index]
                if (dict["Components"] !== undefined){
                    var icons = []
                    var vals = Object.values(dict["Components"])
                    vals.forEach(e => {
                        icons.push(e[1])
                    })
                    SetComponentIcon(icons)
                }
            }

            function CompIconCustomCol() {
                var dict = Utils.GetCurrentItemDict()["ItemComponent_"+values.index]
                if (dict["Components"] !== undefined){
                    var colors = []
                    var vals = Object.values(dict["Components"])
                    vals.forEach(e => {
                        colors.push(e[2])
                    })
                    SetComponentIconColor(colors)
                }
            }

            function CompIconCol() {
                var dict = Utils.GetCurrentItemDict()["ItemComponent_"+values.index]
                if (dict["Components"] !== undefined){
                    var colors = []
                    var vals = Object.values(dict["Components"])
                    vals.forEach(e => {
                        colors.push(e[3])
                    })
                    SetComponentIconCustomColor(colors)
                }
            }

            function SetComps(){
                var list = []
                for (var i = 0; i < componentName.length; i++){
                    list.push(                            
                    <div style={{ display:"flex", flexDirection:"row"}}>
                        <div style={{
                            width:"36px",
                            height:"36px",
                            backgroundColor: componentIconColor[i] == undefined || componentIconColor[i] == null? ColorPalette.GetColor("ComponentsIconPanel", "Weapon") : componentIconColor[i] == "Custom" ? ColorPalette.GetColor("ComponentsIconPanel", componentIconColor[i], componentIconCustomColor[i]) : ColorPalette.GetColor("ComponentsIconPanel", componentIconColor[i]),
                            borderRadius:"100%",
                            marginTop:"1.5pt",
                            marginLeft: "13pt",
                            position:"relative",
                            zIndex:"2",
                            display:"flex",
                            justifyContent:"center"
                        }}>
                            {(componentIcon[i] != null && componentIcon[i] != undefined && componentIcon[i] != "" && checkState != false) ? 
                                <div style={{
                                    maskImage: "url('"+componentIcon[i]+"')", 
                                    maskSize: "contain",
                                    maskPosition:"center",
                                    maskRepeat:"no-repeat",
                                    width:"22px", 
                                    height:"22px", 
                                    alignSelf:"center",   
                                    justifySelf:"center",                                
                                    backgroundColor: componentIconColor[i] == undefined || componentIconColor[i] == null? ColorPalette.GetColor("ComponentsIcon", "Weapon") : componentIconColor[i] == "Custom" ? ColorPalette.GetColor("ComponentsIcon", componentIconColor[i], componentIconCustomColor[i]) : ColorPalette.GetColor("ComponentsIcon", componentIconColor[i])}}/> : ""}
                            </div>
                        <div style={{
                            height:"36px",
                            backgroundColor:ColorPalette.GetColor("ComponentsTextPanel"),
                            borderRadius:"18px",
                            marginTop:"1.5pt",
                            marginLeft: "-26pt",
                            paddingRight: "20px",
                            marginRight: "4px",
                            position:"relative",
                            alignContent:"center"
                        }}>
                            <h3 style={{
                                fontSize:"14.25px",
                                color: ColorPalette.GetColor("Text"),
                                fontFamily:"Retail",
                                fontWeight:"600",
                                marginLeft: "30pt",
                            }}>{componentName[i]}</h3>
                        </div>

                    </div>)
                }
                return list
            }

            return(
                <div style={{
                    backgroundColor:ColorPalette.GetColor("ComponentsPanel"), 
                    width:"450px", 
                    borderRadius:"7pt",
                    borderTopLeftRadius: values.placement == 0 ? "7pt" : "0pt",
                    borderTopRightRadius: values.placement == 0 ? "7pt" : "0pt",
                    borderBottomLeftRadius: values.placement < (values.listSize - 1) ? "0pt" : "7pt",
                    borderBottomRightRadius: values.placement < (values.listSize - 1) ? "0pt" : "7pt",
                    paddingBottom: "6px"
                    }}>
                    <h3 style={{
                        fontSize:"13px",
                        color:ColorPalette.GetColor("Text"),
                        fontFamily:"Retail",
                        paddingLeft: "12pt",
                        paddingTop:"1.15pt"
                    }}>COMPONENTS:</h3>
                    {SetComps()}
                </div>
            )
        break;
        //STATS
        case "Stats":

            setterFunctions = {
                "Stats" : SetStatTitle,
            }

            return(
                <div style={{
                    backgroundColor:ColorPalette.GetColor("DescriptionPanel"), 
                    width:"450px", 
                    borderRadius:"7pt",
                    borderTopLeftRadius: values.placement == 0 ? "7pt" : "0pt",
                    borderTopRightRadius: values.placement == 0 ? "7pt" : "0pt",
                    borderBottomLeftRadius: values.placement < (values.listSize - 1) ? "0pt" : "7pt",
                    borderBottomRightRadius: values.placement < (values.listSize - 1) ? "0pt" : "7pt",
                    paddingBottom: "11.5px",
                    display:"flex",
                    flexDirection:"column",
                    paddingTop:"9.75pt",                
                    }}>        
                        <h3 style={{
                            fontSize:"17px",
                            color: ColorPalette.GetColor("Text"),
                            fontFamily:"Retail",
                            fontWeight:"600",
                            paddingLeft:"13pt",  
                        }} dangerouslySetInnerHTML={Utils.markdown(Stats != null && Stats != undefined? Stats.toString() : "")}></h3>            
                </div>
            )
        break;
        //COOLDOWN
        case "Cooldown":

            setterFunctions = {
                "CooldownType" : SetcooldownType,
                "CooldownCustomText" : SetCooldownCustomText,
                "CooldownEnabled" : SetCooldownEnabled,
                "Cooldown" : SetCooldown
            }

            return(
                <div className="VBox">
                    <div style={{
                    backgroundColor:ColorPalette.GetColor("PassivePanel"), 
                    width: cooldownEnabled == "true"? "325px" : "450px", 
                    borderRadius:"7pt",
                    borderTopLeftRadius: values.placement == 0 ? "7pt" : "0pt",
                    borderTopRightRadius: values.placement == 0 && cooldownEnabled == "false" ? "7pt" : "0pt",
                    borderBottomLeftRadius: values.placement < (values.listSize - 1) ? "0pt" : "7pt",
                    borderBottomRightRadius: values.placement < (values.listSize - 1) || cooldownEnabled == "true" ? "0pt" : "7pt",
                    display:"flex",
                    flexDirection:"column",
                    }}> 
                    <h3 style={{
                        fontSize:"18px",
                        color: cooldownType != "Passive" ? cooldownType == "Active" ? "#ffffff" : cooldownType == null? ColorPalette.GetColor("PassiveText") : ColorPalette.GetColor("Text") : ColorPalette.GetColor("PassiveText"),
                        fontFamily:"Retail",
                        fontWeight: cooldownType == "Active" ? "700" : "600",
                        fontStyle: cooldownType != "Passive"? cooldownType == null? "italic" : "normal" : "italic",
                        paddingTop:"2.5pt",
                        paddingBottom:"4.5pt",
                        paddingLeft:"14pt",
                    }} dangerouslySetInnerHTML={
                        Utils.markdown(cooldownType == "Custom"? 
                        cooldownCustomText == undefined? "Passive" : cooldownCustomText.toString() : 
                        (cooldownType == undefined || cooldownType == null) ? "Passive" : cooldownType.toString())}></h3>
                    </div>

                    <div style={{
                    backgroundColor:"#000000", 
                    width: "125px", 
                    borderRadius:"7pt",
                    borderTopLeftRadius: values.placement == 0 ? "7pt" : "0pt",
                    borderTopRightRadius: values.placement == 0 ? "7pt" : "0pt",
                    borderBottomLeftRadius: "0pt",
                    borderBottomRightRadius: values.placement < (values.listSize - 1) ? "0pt" : "7pt",
                    display: cooldownEnabled == "true"? "flex" : "none",
                    justifyContent:"center",
                    flexDirection:"row",
                    }}> 
                        <img src={CooldownIcon} alt="Cooldown Icon"style={{
                            width:"20px",
                            filter: "invert(100%)",
                        }}/>
                        <h3 style={{
                            fontSize:"18px",
                            alignSelf:"center",
                            color: ColorPalette.GetColor("TitleText"),
                            fontFamily:"Retail",
                            fontWeight:"700",
                            paddingTop:"2.5pt",
                            paddingBottom:"4.5pt",
                            paddingLeft:"4pt",
                        }}>{cooldown}</h3>
                    </div>
                </div>            
            )
        break
        //DESCRIPTION
        case "Description":
            setterFunctions = {
                "Description" : SetDescription,
                "ItemComps" : SetItemComps_Description
            }

            function SetItemComps_Description(){
                SetItemComponents(Utils.GetCurrentItemDict()["itemComponents"])
            }

            return(
                <div style={{
                    backgroundColor:ColorPalette.GetColor("DescriptionPanel"), 
                    width:"450px", 
                    height:"auto",
                    borderRadius:"7pt",
                    borderTopLeftRadius: values.placement == 0 ? "7pt" : "0pt",
                    borderTopRightRadius: values.placement == 0 ? "7pt" : "0pt",
                    borderBottomLeftRadius: values.placement < (values.listSize - 1) ? "0pt" : "7pt",
                    borderBottomRightRadius: values.placement < (values.listSize - 1) ? "0pt" : "7pt",
                    overflow:"hidden"
                    }}>
                    <h3 style=
                    {{
                        fontSize:"18px",
                        alignSelf:"center",
                        color: ColorPalette.GetColor("Text"),
                        height:"auto",
                        fontFamily:"Retail",
                        fontWeight:"600",
                        paddingTop: values.placement == 0? "12pt" : Object.values(ItemComponents)[values.placement - 1] == "Stats" ? "0pt" : "12pt",
                        paddingBottom: values.placement == Object.keys(ItemComponents).length - 1? "12pt" : Object.values(ItemComponents)[values.placement + 1] == "Stats" ? "0pt" : "12pt",
                        paddingRight:"13.5pt",
                        paddingLeft:"13.5pt",
                    }} dangerouslySetInnerHTML={Utils.markdown((Description != null && Description != undefined)? Description.toString() : "")}></h3>
                </div>
            )
        break;
        //COMPONENTS OF
        case "ComponentOf":

            setterFunctions = {
                "ComponentOf Name" : CompOfName,
                "ComponentOf Icon" : CompOfIcon,
                "ComponentOf Icon Color" : CompOfIconCol,
                "ComponentOf Icon Custom Color" : CompOfIconCustomCol,
            }

            function CompOfName() {
                var dict = Utils.GetCurrentItemDict()["ItemComponent_"+values.index]
                if (dict["ComponentsOf"] !== undefined){
                    var names = []
                    var vals = Object.values(dict["ComponentsOf"])
                    vals.forEach(e => {
                        names.push(e[0])
                    })
                    SetComponentOfName(names)
                }
            }

            function CompOfIcon() {
                var dict = Utils.GetCurrentItemDict()["ItemComponent_"+values.index]
                if (dict["ComponentsOf"] !== undefined){
                    var icons = []
                    var vals = Object.values(dict["ComponentsOf"])
                    vals.forEach(e => {
                        icons.push(e[1])
                    })
                    SetComponentOfIcon(icons)
                }
            }

            function CompOfIconCol() {
                var dict = Utils.GetCurrentItemDict()["ItemComponent_"+values.index]
                if (dict["ComponentsOf"] !== undefined){
                    var colors = []
                    var vals = Object.values(dict["ComponentsOf"])
                    vals.forEach(e => {
                        colors.push(e[2])
                    })
                    SetComponentOfIconColor(colors)
                }
            }

            function CompOfIconCustomCol() {
                var dict = Utils.GetCurrentItemDict()["ItemComponent_"+values.index]
                if (dict["ComponentsOf"] !== undefined){
                    var colors = []
                    var vals = Object.values(dict["ComponentsOf"])
                    vals.forEach(e => {
                        colors.push(e[3])
                    })
                    SetComponentOfIconCustomColor(colors)
                }
            }

            function SetCompsOf(){
                var list = []
                for (var i = 0; i < componentOfName.length; i++){
                    list.push(                            
                    <div style={{ display:"flex", flexDirection:"row"}}>
                        <div style={{
                            width:"30px",
                            height:"30px",
                            backgroundColor:ComponentOfIconColor[i] == undefined || ComponentOfIconColor[i] == null? ColorPalette.GetColor("ComponentsOfIconPanel", "Weapon") : ComponentOfIconColor[i] == "Custom"?  ColorPalette.GetColor("ComponentsOfIconPanel", ComponentOfIconColor[i], ComponentOfIconCustomColor[i]) : ColorPalette.GetColor("ComponentsOfIconPanel", ComponentOfIconColor[i]),
                            borderRadius:"100%",
                            marginTop:"5pt",
                            marginLeft: "15pt",
                            marginBottom: "5pt",
                            position:"relative",
                            zIndex:"2",
                            display:"flex",
                            justifyContent:"center"
                        }}>
                            {(componentOfIcon[i] != null && componentOfIcon[i] != undefined && componentOfIcon[i] != "" && checkState != false) ?                            
                            <div style={{
                                maskImage: "url('"+componentOfIcon[i]+"')", 
                                maskSize: "contain",
                                maskPosition:"center",
                                maskRepeat:"no-repeat",
                                width:"20px", 
                                height:"20px", 
                                alignSelf:"center",   
                                justifySelf:"center",                                
                                backgroundColor: ComponentOfIconColor[i] == undefined || ComponentOfIconColor[i] == null? ColorPalette.GetColor("ComponentsOfIcon", "Weapon") : ComponentOfIconColor[i] == "Custom" ? ColorPalette.GetColor("ComponentsOfIcon", ComponentOfIconColor[i], ComponentOfIconCustomColor[i]) : ColorPalette.GetColor("ComponentsOfIcon", ComponentOfIconColor[i])}}/> : ""}
                        </div>
                        <div style={{
                            height:"30px",
                            backgroundColor:ColorPalette.GetColor("ComponentsOfTextPanel"),
                            borderRadius:"18px",
                            marginTop:"5pt",
                            marginLeft: "-22pt",
                            paddingRight: "20px",
                            marginRight: "4px",
                            position:"relative",
                            alignContent:"center"
                        }}>
                            <h3 style={{
                                fontSize:"14.25px",
                                color: ColorPalette.GetColor("Text"),
                                fontFamily:"Retail",
                                fontWeight:"600",
                                marginLeft: "26pt",
                            }}>{componentOfName[i]}</h3>
                        </div>

                    </div>)
                }
                return list
            }

            return(
                <div style={{
                    backgroundColor:ColorPalette.GetColor("ComponentsOfPanel"), 
                    width:"450px", 
                    borderRadius:"7pt",
                    borderTopLeftRadius: values.placement == 0 ? "7pt" : "0pt",
                    borderTopRightRadius: values.placement == 0 ? "7pt" : "0pt",
                    borderBottomLeftRadius: values.placement < (values.listSize - 1) ? "0pt" : "7pt",
                    borderBottomRightRadius: values.placement < (values.listSize - 1) ? "0pt" : "7pt",
                    paddingBottom: "6px"
                    }}>
                    <h3 style={{
                        fontSize:"13px",
                        color:ColorPalette.GetColor("Text"),
                        fontFamily:"Retail",
                        paddingLeft: "15pt",
                        paddingTop:"8pt"
                    }}>IS COMPONENT OF:</h3>
                    {SetCompsOf()}
                </div>
            )
        break;
        //STAT TABLE ROW
        case "StatTableRow":
            setterFunctions = {
                "ItemComps" : SetItemComps
            }

            function SetItemComps(){
                SetItemComponents(Utils.GetCurrentItemDict()["itemComponents"])
            }

            function CreateListRowDivs(text, rowCount, vals, p, scalingpresent){

                var CreateListRowText = (textArr, num, rows) => {
                    var textComps = []
                    for (var k = 0; k < textArr.length; k++){
                        if ((k % rows) == num) textComps.push(
                            <h3 style=
                            {{
                                fontSize:"16px",
                                alignSelf:"center",
                                color: ColorPalette.GetColor("Text"),
                                height:"auto",
                                width:"100%",
                                fontFamily:"Retail",
                                fontWeight:"600",
                                paddingRight:"12pt",
                                paddingTop:"5px",
                                paddingLeft:"36pt",
                                lineHeight: "22px",
                            }} dangerouslySetInnerHTML={Utils.markdown(textArr[k])}></h3>
                        )
                    }
                    return textComps
                }

                var textArray = text.split("\\n")
                var divComps = []

                for(var i = 0; i < rowCount; i++ ){
                    divComps.push(
                        <div style={{
                            display:"flex",
                            flexDirection:"column",
                            width: (100 / rowCount)+"%",
                            textAlign:"left",
                        }}>
                            {CreateListRowText(textArray, i, rowCount)}
                        </div>
                    )
                }
                return (
                    <div style={{
                        backgroundColor:ColorPalette.GetColor("StatTablePanel"),
                        height:"auto",
                        minHeight:"34px",
                        borderRadius:"3pt",
                        paddingTop:"5pt",
                        paddingBottom:"5pt",
                        borderTopLeftRadius: p > 0 || Object.values(ItemComponents)[values.placement - 1] == "StatTableRow" ? "0pt" : "3pt",
                        borderBottomLeftRadius: p > 0 || Object.values(ItemComponents)[values.placement + 1] == "StatTableRow"? "0pt" : "3pt",
                        borderTopRightRadius: p < vals.length - 1 || Object.values(ItemComponents)[values.placement - 1] == "StatTableRow"? "0pt" : "3pt",
                        borderBottomRightRadius: p < vals.length - 1 || Object.values(ItemComponents)[values.placement + 1] == "StatTableRow"? "0pt" : "3pt",
                        marginLeft: p == 0? "12.5pt" : "2pt",
                        marginRight: p == vals.length - 1? "12.5pt" : "2pt",
                        marginTop: (vals[p][10] == "None" || vals[p][10] == undefined || vals[i][10] == null) && scalingpresent? "20px" : "0px",
                        display:"flex",
                        flexDirection:"row",
                        alignContent:"center",
                        flexGrow: vals[p][2] != undefined? vals[p][2] * (vals.length <= 1? 1 : 0.91) : 1 * (vals.length <= 1? 1 : 0.91),
                        flexShrink: 1,
                        flexBasis: 0}}>
                        {divComps}
                    </div>
                )
            }

            function SetCellComps(){
                var dict = Utils.GetCurrentItemDict()["ItemComponent_"+values.index]
                if (dict["StatTableCell"] !== undefined){  

                    var cells = []
                    var vals = Object.values(dict["StatTableCell"])

                    var scalingpresent = false    
                    for(var i = 0; i < vals.length; i++){
                        if (vals[i][10] != "None" && vals[i][10] != undefined && vals[i][10] != null && (vals[i][0] == "Cell" || vals[i][0] == undefined)){
                            scalingpresent = true
                        }
                    }           

                    for(var i = 0; i < vals.length; i++){
                        if (vals[i][0] == "Cell" || vals[i][0] == undefined){
                            cells.push(
                                <div style={{
                                    flexGrow: vals[i][2] != undefined? vals[i][2] : 1,
                                    display:"flex",
                                    flexDirection:"column",
                                    justifyContent:"center",
                                    flexShrink:"1",
                                    flexBasis:"0",
                                    height:"auto",
                                }}>
                                    {vals[i][10] != "None" && vals[i][10] != undefined && vals[i][10] != null? <div style={{
                                        height:"20px",
                                        alignSelf:"flex-end",
                                        position:"relative",
                                        right: i == vals.length - 1? "17px" : "3px",
                                        top: "3px",
                                        paddingRight:"5px",
                                        backgroundColor:ColorPalette.GetScalingColor(vals[i][10],vals[i][12],1, true),                                                         
                                    }}>
                                        {Utils.GetScalingIcon(vals[i][10]) == ""? <img src={vals[i][11]} style={{width:"42px", position:"relative", left:"-31px", top:"-5px"}}/> : Utils.GetScalingIcon(vals[i][10])}
                                        <h3 style={{
                                            fontSize:"15px",
                                            color: "#d0d0d0",                                           
                                            top: "-28px",
                                            position:"relative",
                                            fontFamily:"Retail",
                                            fontWeight:"600",
                                            textAlign:"left",
                                            lineHeight:"10px",
                                            marginLeft:"12px",
                                        }} dangerouslySetInnerHTML={Utils.markdown((vals[i][13] != null && vals[i][13] != undefined)? vals[i][13].toString() : "")}></h3> 
                                    </div> : ""}
                                    <div style={{
                                        backgroundColor:ColorPalette.GetColor("StatTablePanel"),
                                        height:"auto",
                                        minHeight:"70px",
                                        borderRadius:"3pt",
                                        borderTopLeftRadius: i > 0 || Object.values(ItemComponents)[values.placement - 1] == "StatTableRow" ? "0pt" : "3pt",
                                        borderBottomLeftRadius: i > 0 || Object.values(ItemComponents)[values.placement + 1] == "StatTableRow"? "0pt" : "3pt",
                                        borderTopRightRadius: i < vals.length - 1 || Object.values(ItemComponents)[values.placement - 1] == "StatTableRow"? "0pt" : "3pt",
                                        borderBottomRightRadius: i < vals.length - 1 || Object.values(ItemComponents)[values.placement + 1] == "StatTableRow"? "0pt" : "3pt",
                                        marginLeft: i == 0? "12.5pt" : "2pt",
                                        marginRight: i == vals.length - 1? "12.5pt" : "2pt",   
                                        marginTop: (vals[i][10] == "None" || vals[i][10] == undefined || vals[i][10] == null) && scalingpresent? "20px" : "0px",
                                        paddingLeft:"5px",
                                        paddingRight:"5px",
                                        paddingTop:"2px",
                                        paddingBottom:"2px",
                                        flexGrow: vals[i][2] != undefined? vals[i][2] : 1,
                                        display:"flex",
                                        flexDirection:"column",
                                        justifyContent:"center",
                                        flexShrink:"1",
                                        flexBasis:"0",
                                        textWrap:"wrap",
                                        borderStyle: vals[i][10] == "None"? "none" : "solid",
                                        borderColor: vals[i][10] == "None"? "none" : ColorPalette.GetScalingColor(vals[i][10],vals[i][12],1, false),
                                        borderWidth: vals[i][10] == "None"? "0px" : "3px",
                                        backgroundImage: vals[i][10] == "None"? "none" : "radial-gradient("+ColorPalette.GetColor("StatTablePanel")+" 50%,"+ColorPalette.GetScalingColor(vals[i][10],vals[i][12],0.4)+")",
                                    }}>
                                        <div style={{display:"flex", justifyContent:"center"}}>
                                            {(vals[i][3] != null && vals[i][3] != undefined && vals[i][3] != "" && checkState != false) ? 
                                            <div style={{
                                                maskImage: "url('"+vals[i][3]+"')", 
                                                maskSize: "contain",
                                                maskPosition:"center",
                                                maskRepeat:"no-repeat",
                                                width:"19px", 
                                                height:"19px",
                                                alignSelf:"center",   
                                                marginRight:"4px",        
                                                backgroundColor: vals[i][4] == "Custom"? (vals[i][14] ?? "#000000") : ColorPalette.IconHexColors[vals[i][4] ?? "Weapon"]}}/> : ""}
                                            <h3 style=
                                            {{
                                                fontSize:"20px",
                                                alignSelf:"center",
                                                color: ColorPalette.GetColor("Text"),
                                                height:"auto",
                                                fontFamily:"Retail",
                                                fontWeight:"600",                          
                                                lineHeight: "20px",
                                            }} dangerouslySetInnerHTML={Utils.markdown((vals[i][5] != null && vals[i][5] != undefined)? vals[i][5].toString() : "")}></h3> 
                                        </div>
                                        <h3 style=
                                        {{
                                            fontSize:"15px",
                                            alignSelf:"center",
                                            color: ColorPalette.GetColor("Text"),
                                            height:"auto",
                                            width:"115%",
                                            fontFamily:"Retail",
                                            fontWeight:"600",
                                            marginTop:"4.75px",
                                            textAlign:"center",
                                            lineHeight: "16px",
                                        }} dangerouslySetInnerHTML={Utils.markdown((vals[i][6] != null && vals[i][6] != undefined)? vals[i][6].toString() : "")}></h3> 
                                        <h3 style=
                                        {{
                                            fontSize:"100%",
                                            color: ColorPalette.GetColor("Text"),
                                            height:"auto",
                                            fontFamily:"Retail",
                                            fontWeight:"600",
                                            lineHeight: "22px",
                                            textAlign:"center",
                                            opacity: vals[i][7] == "Conditional"? 0.7 : 1.0
                                        }} dangerouslySetInnerHTML={
                                            vals[i][7] == "Custom"? Utils.markdown((vals[i][8] != null && vals[i][8] != undefined)? vals[i][8].toString() : "") : 
                                            vals[i][7] == "Conditional"? Utils.markdown("__Conditional__") : Utils.markdown("")}></h3> 
                                    </div>
                                </div>
                            )
                        }
                        else{
                            cells.push(
                                CreateListRowDivs(vals[i][1] ?? "", vals[i][9] ?? 1, vals, i, scalingpresent)
                            )
                        }  
                    }
                    return cells
                }
            }

            return(
                <div style={{
                    backgroundColor:ColorPalette.GetColor("DescriptionPanel"), 
                    width:"450px", 
                    height:"auto",
                    borderRadius:"7pt",
                    borderTopLeftRadius: values.placement == 0 ? "7pt" : "0pt",
                    borderTopRightRadius: values.placement == 0 ? "7pt" : "0pt",
                    borderBottomLeftRadius: values.placement < (values.listSize - 1) ? "0pt" : "7pt",
                    borderBottomRightRadius: values.placement < (values.listSize - 1) ? "0pt" : "7pt",
                    display:"flex",
                    alignContent:"stretch",
                    flexWrap:'wrap',
                    paddingTop: values.placement == 0?
                        "10pt" :
                        (Object.values(ItemComponents)[values.placement - 1] == "StatTableRow" ||
                        Object.values(ItemComponents)[values.placement - 1] == "Description" ||
                        Object.values(ItemComponents)[values.placement - 1] == "Stats") ? "1.5pt" : "10pt",
                    paddingBottom: values.placement == Object.keys(ItemComponents).length - 1?
                        "10pt" :
                        (Object.values(ItemComponents)[values.placement + 1] == "StatTableRow" ||
                        Object.values(ItemComponents)[values.placement + 1] == "Description" ||
                        Object.values(ItemComponents)[values.placement + 1] == "Stats") ? "1.5pt" : "10pt",
                    }}>
                    {SetCellComps()}
                </div>
            )
        break;
    }
}

export default ItemComponent