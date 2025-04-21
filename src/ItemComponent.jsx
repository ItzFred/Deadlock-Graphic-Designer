import { useState, useEffect, useRef } from "react";
import SoulIcon from "./assets/icons/icon_soul.svg"
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

    var [componentName, SetComponentName] = useState([""])
    var [componentIcon, SetComponentIcon] = useState([""])
    var [componentIconColor, SetComponentIconColor] = useState([""])
    var [components, SetComponents] = useState([])

    var [Stats, SetStatTitle] = useState(["Stat Description"])

    var [cooldownType, SetcooldownType] = useState("Passive")
    var [cooldownCustomText, SetCooldownCustomText] = useState("Custom")
    var [cooldownEnabled, SetCooldownEnabled] = useState("false")
    var [cooldown, SetCooldown] = useState("1s")

    var [Description, SetDescription] = useState("Description")

    var [componentOfName, SetComponentOfName] = useState(["Component"])
    var [componentOfIcon, SetComponentOfIcon] = useState([""])
    var [componentOfIconColor, SetComponentOfIconColor] = useState([""])
    var [componentsOf, SetComponentsOf] = useState([])

    var [ItemComponents, SetItemComponents] = useState([""])

    switch(values.title){
        //TITLE
        case "Title":
            setterFunctions = {
                "Title" : SetTitle,
                "Cost" : SetCost
            }
            

            return(
                <div style={{
                    backgroundColor:ColorPalette.GetColor("TitlePanel"), 
                    width:"450px", 
                    height:"96px",
                    borderRadius:"7pt",
                    borderTopLeftRadius: values.placement == 0 ? "7pt" : "0pt",
                    borderTopRightRadius: values.placement == 0 ? "7pt" : "0pt",
                    borderBottomLeftRadius: values.placement < (values.listSize - 1) ? "0pt" : "7pt",
                    borderBottomRightRadius: values.placement < (values.listSize - 1) ? "0pt" : "7pt"
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
                        flexDirection:"row"
                    }}>
                        <img src={SoulIcon} alt="Soul Icon"style={{
                            width:"11.5px",
                            paddingLeft: "12pt",
                            paddingTop:"2.5pt",
                            filter: ColorPalette.IconColors.Soul,
                        }}/>
                        <h3 style=
                        {{
                            color:"#9affd6", 
                            fontSize:"19px",
                            fontFamily:"Retail",
                            paddingLeft: "3.6pt",
                            paddingTop:"1.1pt"
                        }}>{cost}</h3>
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

            function CompIconCol() {
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

            function SetComps(){
                var list = []
                for (var i = 0; i < componentName.length; i++){
                    list.push(                            
                    <div style={{ display:"flex", flexDirection:"row"}}>
                        <div style={{
                            width:"36px",
                            height:"36px",
                            backgroundColor: componentIconColor[i] == undefined || componentIconColor[i] == null? ColorPalette.GetColor("ComponentsIconPanel", "Weapon") : ColorPalette.GetColor("ComponentsIconPanel", componentIconColor[i]),
                            borderRadius:"100%",
                            marginTop:"1.5pt",
                            marginLeft: "13pt",
                            position:"relative",
                            zIndex:"2",
                            display:"flex",
                            justifyContent:"center"
                        }}>
                            {(componentIcon[i] != null && componentIcon[i] != undefined && componentIcon[i] != "" && checkState != false) ? <img src={ componentIcon[i] } crossOrigin="anonymous" onError={(e)=>{e.target.src=null; SetCheckState(false)}} style={{
                                width:"22px", 
                                height:"22px", 
                                alignSelf:"center", 
                                filter:componentIconColor[i] == undefined || componentIconColor[i] == null? ColorPalette.GetColor("ComponentsIconStyle", "Weapon") : ColorPalette.GetColor("ComponentsIconStyle", componentIconColor[i])}}/> : ""}
                        </div>
                        <div style={{
                            height:"36px",
                            backgroundColor:ColorPalette.GetColor("ComponentsTextPanel"),
                            borderRadius:"18px",
                            marginTop:"1.5pt",
                            marginLeft: "-26pt",
                            paddingRight: "16px",
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
                            fontSize:"18px",
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
                        paddingTop:"11.6pt",
                        paddingBottom:"12pt",
                        paddingRight:"12.5pt",
                        paddingLeft:"12.5pt",
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

            function SetCompsOf(){
                var list = []
                for (var i = 0; i < componentOfName.length; i++){
                    list.push(                            
                    <div style={{ display:"flex", flexDirection:"row"}}>
                        <div style={{
                            width:"30px",
                            height:"30px",
                            backgroundColor:componentOfIconColor[i] == undefined || componentOfIconColor[i] == null? ColorPalette.GetColor("ComponentsOfIconPanel", "Weapon") : ColorPalette.GetColor("ComponentsOfIconPanel", componentOfIconColor[i]),
                            borderRadius:"100%",
                            marginTop:"5pt",
                            marginLeft: "15pt",
                            marginBottom: "5pt",
                            position:"relative",
                            zIndex:"2",
                            display:"flex",
                            justifyContent:"center"
                        }}>
                            {(componentOfIcon[i] != null && componentOfIcon[i] != undefined && componentOfIcon[i] != "" && checkState != false) ? <img src={componentOfIcon[i]} crossOrigin="anonymous" onError={(e)=>{e.target.src=null; SetCheckState(false)}} style={{
                                width:"20px", 
                                height:"20px", 
                                alignSelf:"center", 
                                filter:componentOfIconColor[i] == undefined || componentOfIconColor[i] == null? ColorPalette.GetColor("ComponentsOfIconStyle", "Weapon") : ColorPalette.GetColor("ComponentsOfIconStyle", componentOfIconColor[i])}}/> : ""}
                        </div>
                        <div style={{
                            height:"30px",
                            backgroundColor:ColorPalette.GetColor("ComponentsOfTextPanel"),
                            borderRadius:"18px",
                            marginTop:"5pt",
                            marginLeft: "-22pt",
                            paddingRight: "16px",
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
                                        flexGrow: vals[i][2] != undefined? vals[i][2] : 1,
                                        display:"flex",
                                        flexDirection:"column",
                                        justifyContent:"center",
                                        flexShrink:"1",
                                        flexBasis:"0",
                                        borderStyle: vals[i][10] == "None"? "none" : "solid",
                                        borderColor: vals[i][10] == "None"? "none" : ColorPalette.GetScalingColor(vals[i][10],vals[i][12],1, false),
                                        borderWidth: vals[i][10] == "None"? "0px" : "3px",
                                        backgroundImage: vals[i][10] == "None"? "none" : "radial-gradient("+ColorPalette.GetColor("StatTablePanel")+" 50%,"+ColorPalette.GetScalingColor(vals[i][10],vals[i][12],0.4)+")",
                                    }}>
                                        <div style={{display:"flex", justifyContent:"center"}}>
                                            {(vals[i][3] != null && vals[i][3] != undefined && vals[i][3] != "" && checkState != false) ? <img src={vals[i][3]} crossOrigin="anonymous" onError={(e)=>{e.target.src=null; SetCheckState(false)}} style={{
                                            width:"17px", 
                                            height:"17px",
                                            marginRight:"4px",
                                            alignSelf:"center",
                                            filter:ColorPalette.GetIconColor(vals[i][4])}}/> : ""}
                                            <h3 style=
                                            {{
                                                fontSize:"20px",
                                                alignSelf:"center",
                                                color: ColorPalette.GetColor("Text"),
                                                height:"auto",
                                                fontFamily:"Retail",
                                                fontWeight:"600",                          
                                                lineHeight: "20px"
                                            }} dangerouslySetInnerHTML={Utils.markdown((vals[i][5] != null && vals[i][5] != undefined)? vals[i][5].toString() : "")}></h3> 
                                        </div>
                                        <h3 style=
                                        {{
                                            fontSize:"15px",
                                            alignSelf:"center",
                                            color: ColorPalette.GetColor("Text"),
                                            height:"auto",
                                            fontFamily:"Retail",
                                            fontWeight:"600",
                                            marginTop:"4.75px",
                                            textAlign:"center",
                                            lineHeight: "16px",
                                            marginLeft: "5px",
                                            marginRight: "5px",
                                        }} dangerouslySetInnerHTML={Utils.markdown((vals[i][6] != null && vals[i][6] != undefined)? vals[i][6].toString() : "")}></h3> 
                                        <h3 style=
                                        {{
                                            fontSize:"15px",
                                            color: ColorPalette.GetColor("Text"),
                                            height:"auto",
                                            fontFamily:"Retail",
                                            fontWeight:"600",
                                            lineHeight: "22px",
                                            marginLeft: "5px",
                                            marginRight: "5px",
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
                                <div style={{
                                    backgroundColor:ColorPalette.GetColor("StatTablePanel"),
                                    height:"auto",
                                    borderRadius:"3pt",
                                    paddingTop:"8.5pt",
                                    paddingBottom:"8.5pt",
                                    borderTopLeftRadius: i > 0 || Object.values(ItemComponents)[values.placement - 1] == "StatTableRow" ? "0pt" : "3pt",
                                    borderBottomLeftRadius: i > 0 || Object.values(ItemComponents)[values.placement + 1] == "StatTableRow"? "0pt" : "3pt",
                                    borderTopRightRadius: i < vals.length - 1 || Object.values(ItemComponents)[values.placement - 1] == "StatTableRow"? "0pt" : "3pt",
                                    borderBottomRightRadius: i < vals.length - 1 || Object.values(ItemComponents)[values.placement + 1] == "StatTableRow"? "0pt" : "3pt",
                                    marginLeft: i == 0? "12.5pt" : "2pt",
                                    marginRight: i == vals.length - 1? "12.5pt" : "2pt",
                                    marginTop: (vals[i][10] == "None" || vals[i][10] == undefined || vals[i][10] == null) && scalingpresent? "20px" : "0px",
                                    display:"flex",
                                    flexGrow: vals[i][2] != undefined? vals[i][2] : 1,
                                    flexShrink: 1,
                                    flexBasis: 0,
                                    columnCount: vals[i][9] != undefined? vals[i][9] : 1,
                                    columnWidth:"50%",
                                }}>
                                    <h3 style=
                                    {{
                                        fontSize:"18px",
                                        alignSelf:"center",
                                        color: ColorPalette.GetColor("Text"),
                                        height:"auto",
                                        fontFamily:"Retail",
                                        fontWeight:"600",
                                        paddingRight:"12pt",
                                        paddingLeft:"12pt",
                                        lineHeight: "22px"
                                    }} dangerouslySetInnerHTML={Utils.markdown((vals[i][1] != null && vals[i][1] != undefined)? vals[i][1].toString() : "")}></h3>
                                </div>
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