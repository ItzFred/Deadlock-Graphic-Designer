import { useCallback, useEffect, useRef, useState } from "react"
import ColorPalette from "./ColorPalette"
import Utils from "./Utils"
import "./IconSelector.css"

const IconSelector = (values) => {

    const [openMenu, SetOpenMenu] = useState(false)

    const imageFiles = {
        "Stat Icons" : ["","Stat/abilityDuration","Stat/abilityFrame","Stat/weaponItem","Stat/abilityRange","Stat/chevron","Stat/lightningBolt","Stat/lock","Stat/plus","Stat/bulletShieldAndDPS","Stat/punch","Stat/spiritShield",
            "Stat/blankShieldPointed","Stat/blankShield","Stat/shieldPointedWithTrim","Stat/healAmp","Stat/bulletResist","Stat/spiritResist","Stat/WeaponShield","Stat/FlameShield","Stat/vitalityItem",
            "Stat/boot","Stat/MovementUp","Stat/MovementDown","Stat/stamina","Stat/moveAndSprintSpeed",
            "Stat/ChargeBolt","Stat/chargeCooldown","Stat/cooldown","Stat/maxHealth","Weapon/T4/luckyShot","Stat/healthRegen","Stat/Spinner",
            "Stat/bulletDamage","Stat/singleBullet","Stat/tripleBullet","Stat/fireRate","Stat/ammo","Stat/bulletLifesteal","Stat/spiritLifesteal",
            "Stat/soul","Stat/spiritItem",
            "Stat/spiritPower","Stat/stat","Stat/statWithDots",
            "Stat/Silence","Stat/Stun","Stat/Invisible","Stat/Vision",],
        "Weapon Items" : ["Weapon/T1/basicMag","Weapon/T1/closeQuarters","Weapon/T1/headshotBooster","Weapon/T1/highVelocityMag","Weapon/T1/hollowPointWard","Weapon/T1/monsterRounds","Weapon/T1/rapidRounds","Weapon/T1/restorativeShot",
            "Weapon/T2/berserker","Weapon/T2/fleetfoot","Weapon/T2/kineticDash","Weapon/T2/longRange","Weapon/T2/meleeCharge","Weapon/T2/mysticShot","Weapon/T2/slowingBullets","Weapon/T2/soulShredderBullets","Weapon/T2/swiftStriker",
            "Weapon/T3/alchemicalFire","Weapon/T3/burstFire","Weapon/T3/escalatingResilience","Weapon/T3/headhunter","Weapon/T3/heroicAura","Weapon/T3/intensifyingMagazine","Weapon/T3/pointBlank","Weapon/T3/pristineEmblem","Weapon/T3/sharpshooter","Weapon/T3/teslaBullets","Weapon/T3/titanicMagazine","Weapon/T3/toxicBullets",
            "Weapon/T4/cripplingHeadshot","Weapon/T4/frenzy","Weapon/T4/glassCannon","Weapon/T4/luckyShot","Weapon/T4/ricochet","Weapon/T4/shadowWeave","Weapon/T4/silencer","Weapon/T4/spiritualOverflow","Weapon/T4/vampiricBurst"
        ],
        "Vitality Items" : ["Vitality/T1/enduringSpirit","Vitality/T1/extraHealth","Vitality/T1/extraRegen","Vitality/T1/extraStamina","Vitality/T1/healingRite","Vitality/T1/meleeLifesteal","Vitality/T1/sprintBoots",
            "Vitality/T2/bulletArmor","Vitality/T2/bulletLifesteal","Vitality/T2/combatBarrier","Vitality/T2/debuffReducer","Vitality/T2/divineBarrier","Vitality/T2/enchantersBarrier","Vitality/T2/enduringSpeed","Vitality/T2/healbane","Vitality/T2/healingBooster","Vitality/T2/healthNova","Vitality/T2/reactiveBarrier","Vitality/T2/restorativeLocker","Vitality/T2/returnFire","Vitality/T2/spiritArmor","Vitality/T2/spiritLifesteal",
            "Vitality/T3/debuffRemover","Vitality/T3/fortitude","Vitality/T3/improvedBulletArmor","Vitality/T3/improvedSpiritArmor","Vitality/T3/lifestrike","Vitality/T3/majesticLeap","Vitality/T3/metalSkin","Vitality/T3/rescueBeam","Vitality/T3/superiorStamina","Vitality/T3/veilWalker",
            "Vitality/T4/colossus","Vitality/T4/inhibitor","Vitality/T4/leech","Vitality/T4/phantomStrike","Vitality/T4/siphonBullets","Vitality/T4/soulRebirth","Vitality/T4/unstoppable"

        ],
        "Spirit Items" : ["Spirit/T1/ammoScavenger","Spirit/T1/extraCharge","Spirit/T1/extraSpirit","Spirit/T1/infuser","Spirit/T1/mysticBurst","Spirit/T1/mysticReach","Spirit/T1/spiritStrike",
            "Spirit/T2/bulletResistShredder","Spirit/T2/coldFront","Spirit/T2/decay","Spirit/T2/durationExtender","Spirit/T2/improvedCooldown","Spirit/T2/mysticVulnerability","Spirit/T2/quicksilverReload","Spirit/T2/slowingHex","Spirit/T2/suppressor","Spirit/T2/witheringWhip",
            "Spirit/T3/etherealShift","Spirit/T3/improvedBurst","Spirit/T3/improvedReach","Spirit/T3/improvedSpirit","Spirit/T3/knockdown","Spirit/T3/mysticSlow","Spirit/T3/rapidRecharge","Spirit/T3/silenceGlyph","Spirit/T3/superiorCooldown","Spirit/T3/superiorDuration","Spirit/T3/surgeOfPower","Spirit/T3/tormentPulse",
            "Spirit/T4/boundlessSpirit","Spirit/T4/curse","Spirit/T4/divinersKevlar","Spirit/T4/echoShard","Spirit/T4/escalatingExposure","Spirit/T4/magicCarpet","Spirit/T4/mysticReverb","Spirit/T4/refresher",
        ],
        "Custom Items" : ["CustomItems/HeartTaker","CustomItems/LightningFists"]
    }

    function SelectIcon(iconName, element){
        var place = JSON.parse(localStorage.getItem("currentValue"))
        var path = JSON.parse(localStorage.getItem("currentPath"))
        var index = JSON.parse(localStorage.getItem("currentIndex"))
        var arrayPlace = JSON.parse(localStorage.getItem("currentArrayPlace"))
        var dict = Utils.GetCurrentItemDict()["ItemComponent_"+index]
        
        if (place == null){
            Utils.SetDictionaryArray(dict, path, iconName == "" ? "" : "./publicIcons/"+iconName+".svg", 0)
        }
        else{
            Utils.SetDictionaryArray(dict, path+".A"+place, iconName == "" ? "" : "./publicIcons/"+iconName+".svg", arrayPlace)
        }
        Utils.SetCurrentItemDictKey("ItemComponent_"+index, dict)
        window.dispatchEvent(new Event("ItemComponentEditorInputSent_"+index));
        window.dispatchEvent(new Event("itemComponent"));
        var popover = document.getElementById("IconSelectorPopover")
        popover.hidePopover()

    }

    function getIconButtons(place){
        var images = []
        Object.entries(imageFiles).map(([k,v]) => {
            var imgElements = []
            v.forEach(e => {
                imgElements.push(
                    <button className="IconSelectButton" style={{padding:"2px", pointerEvents:"auto"}} type="button" onClick={elem => { SelectIcon(e, elem)}}>
                        {e == "" ? "" : <img className="IconSelectImage" src={"./publicIcons/"+e+".svg"} style={{width:"28px", height:"28px", position:"relative", top:"2px",}}/>}
                    </button>
                )
            })
            images.push(
            <><h3 style={{color:"#efdfbf", fontSize:"36px", paddingLeft:"12px"}}>{k}</h3>
            <div style={{display:"grid", gridTemplateColumns: "repeat(auto-fit, minmax(5px, 50px))"}}>
                {imgElements}
            </div></>
            )
        })
        return images
    }

    return(
        <>
        <button popoverTarget="IconSelectorPopover" className="IconSelectButton" style={{
            margin: "8px",
            padding: "8px",
            borderRadius: "8px",
            width:values.width == undefined? "100%" : values.width,
            alignContent:"center",
            justifyContent:"center",
            pointerEvents:"all",
        }} onClick={e => { localStorage.setItem("currentValue", JSON.stringify(values.place)); localStorage.setItem("currentPath", JSON.stringify(values.path)); localStorage.setItem("currentIndex", JSON.stringify(values.index)); localStorage.setItem("currentArrayPlace", JSON.stringify(values.arrayPlace)); e.stopPropagation();}} type="button">
            {values.defaultValue != undefined && values.defaultValue != null? 
                values.defaultValue == "" ? "" : <img className="IconSelectImage" src={values.defaultValue} style={{width:"20px", height:"20px", marginRight:"5px", alignSelf:"center"}}/>
                : ""}
            Select Icon           
        </button>
        <div popover="auto" id="IconSelectorPopover" style={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderWidth:"0px",
            justifyContent:"center",
            alignContent:"center",
            cursor:"pointer"           
        }}>
            <div style={{
                display: "block",
                maxWidth:"60%",
                maxHeight:"80%",
                overflowY:"scroll",
                backgroundColor: '#212020',
                position:"relative",
                zIndex: '10',
                padding: "12px",
                paddingRight: "8px",
                marginLeft:"auto",
                marginRight:"auto",
                borderRadius: "8px",
                cursor:"auto",
                justifyContent:"center",
                alignContent:"center",

            }}>
                {getIconButtons()}
        </div>

        </div>
        </>
    )
}

export default IconSelector