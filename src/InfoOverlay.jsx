import { useState, useEffect } from "react"
import './index.css'
import Utils from "./Utils"
import websiteLogo from './assets/WebsiteLogoNew.svg'
import FredLogo from './assets/FredLogo.svg'

function InfoOverlay(values){
    
    const [visible, SetVisibility] = useState(false)

    useEffect( () => {

        function displayInfo(){
            SetVisibility(true)
        }

        window.addEventListener("displayInfoOverlay", displayInfo);
        return () => {
          window.removeEventListener("displayInfoOverlay", displayInfo);
        };
    }, [])

    function off(){
        SetVisibility(false)
    }

    return(
        <div class="infoOverlay" style={{
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
            justifyContent:"center"
        }} onClick={off}>
            <div onClick={e =>{e.stopPropagation();}} style={{
                display: "flex",
                position: 'fixed',
                alignSelf:"center",
                backgroundColor: '#212020',
                zIndex: '10',
                padding: "12px",
                borderRadius: "8px",
                cursor:"auto",
                flexBasis:"100%",
                flexDirection:"column"
            }}>
                <img src={websiteLogo} id="InfoWebsiteLogo" alt="Website logo" style={{width:"250px", margin:"15px"}}/>
                <div style={{display: "flex"}}>
                    {/* Markdown Guide */}
                    <div style={{margin:"5px", padding:"15px", background:"#1A1A1A",borderRadius:"7px"}}>
                        <h3 style={{fontFamily:"Retail", fontSize:"24px", textAlign:"center", marginBottom:"20px", color:"#efdfbf"}}>
                        Text Markdown Guide
                        </h3>
                        <div style={{display:"flex",}}>
                            <h3 style={{fontFamily:"Retail", fontSize:"18px", color:"#efdfbf", width:"50%"}} dangerouslySetInnerHTML={Utils.markdown(
                                "**Bold** \\n __Italic__ \\n\\n [[White]] \\n ((Dark)) \\n {{Subtitle}} \\n\\n [#ff0000,Color] \\n [weapon,Weapon Color] \\n [vitality, Vitality Color] \\n [spirit, Spirit Color] \\n [soul, Soul Color] \\n\\n Line Break"
                            )}/>
                            <h3 style={{fontFamily:"Retail", fontSize:"18px", color:"#efdfbf", width:"50%"}}>
                                **Bold**
                                __Italic__ <br/><br/>
                                {"[[White]]"}<br/>
                                {"((Dark))"}<br/>
                                {"{{Subtitle}}"}<br/><br/>

                                [#ff0000,Color]<br/>
                                [weapon,Color]<br/>
                                [vitality,Color]<br/>
                                [spirit,Color]<br/>
                                [soul,Color]<br/><br/>

                                \n
                            </h3>
                        </div>
                    </div>
                    {/* Credits */}
                    <div style={{margin:"5px", padding:"15px", background:"#1A1A1A",borderRadius:"7px", maxWidth:"400px"}}>
                        <h3 style={{fontFamily:"Retail", fontSize:"24px", textAlign:"center", marginBottom:"20px", color:"#efdfbf"}}>
                        Credits
                        </h3>
                        <h3 style={{fontFamily:"Retail", fontSize:"18px", color:"#efdfbf", width:"100%"}}>
                            Site created by Fred. If you have any issues or suggestions, please DM me on Discord at @fredleon <br/>
                            <img src={FredLogo} id="FredLogo" alt="Website logo" style={{width:"70px", marginTop:"20px"}}/> <br/>
                            This is my first project made in React, so I hope you can excuse me for not being the best programmer. But I had fun making it. <br/><br/>
                            Shoutout to Tryneus and his own graphic generator "Deadmock" for lending a helping hand.
                            
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default InfoOverlay