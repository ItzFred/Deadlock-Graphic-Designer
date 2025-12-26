import { useCallback, useEffect, useRef, useState } from "react"
import ColorPalette from "./ColorPalette"
import Utils from "./Utils"
import "./IconSelector.css"

const IconSelector = (values) => {

    const [openMenu, SetOpenMenu] = useState(false)

    const imageFiles = {
        "Stat Icons" : ["","Stat/abilityDuration.svg","Stat/abilityFrame.svg","Stat/weaponItem.svg","Stat/abilityRange.svg","Stat/chevron.svg","Stat/lightningBolt.svg","Stat/lock.svg","Stat/plus.svg","Stat/bulletShieldAndDPS.svg","Stat/punch.svg","Stat/spiritShield.svg",
            "Stat/blankShieldPointed.svg","Stat/blankShield.svg","Stat/shieldPointedWithTrim.svg","Stat/healAmp.svg","Stat/bulletResist.svg","Stat/spiritResist.svg","Stat/WeaponShield.svg","Stat/FlameShield.svg","Stat/vitalityItem.svg",
            "Stat/boot.svg","Stat/MovementUp.svg","Stat/MovementDown.svg","Stat/stamina.svg","Stat/moveAndSprintSpeed.svg",
            "Stat/ChargeBolt.svg","Stat/chargeCooldown.svg","Stat/cooldown.svg","Stat/maxHealth.svg","Weapon/T4/luckyShot.svg","Stat/healthRegen.svg","Stat/Spinner.svg",
            "Stat/bulletDamage.svg","Stat/singleBullet.svg","Stat/tripleBullet.svg","Stat/fireRate.svg","Stat/ammo.svg","Stat/bulletLifesteal.svg","Stat/spiritLifesteal.svg",
            "Stat/soul.svg","Stat/spiritItem.svg",
            "Stat/spiritPower.svg","Stat/stat.svg","Stat/statWithDots.svg",
            "Stat/Silence.svg","Stat/Stun.svg","Stat/Invisible.svg","Stat/Vision.svg",],
        /*"Weapon Items" : ["Weapon/T1/basicMag","Weapon/T1/closeQuarters","Weapon/T1/headshotBooster","Weapon/T1/highVelocityMag","Weapon/T1/hollowPointWard","Weapon/T1/monsterRounds","Weapon/T1/rapidRounds","Weapon/T1/restorativeShot",
            "Weapon/T2/berserker","Weapon/T2/fleetfoot","Weapon/T2/kineticDash","Weapon/T2/longRange","Weapon/T2/meleeCharge","Weapon/T2/mysticShot","Weapon/T2/slowingBullets","Weapon/T2/soulShredderBullets","Weapon/T2/swiftStriker",
            "Weapon/T3/alchemicalFire","Weapon/T3/burstFire","Weapon/T3/escalatingResilience","Weapon/T3/headhunter","Weapon/T3/heroicAura","Weapon/T3/intensifyingMagazine","Weapon/T3/pointBlank","Weapon/T3/pristineEmblem","Weapon/T3/sharpshooter","Weapon/T3/SpellslingerHeadshots","Weapon/T3/teslaBullets","Weapon/T3/titanicMagazine","Weapon/T3/toxicBullets",
            "Weapon/T4/cripplingHeadshot","Weapon/T4/frenzy","Weapon/T4/glassCannon","Weapon/T4/luckyShot","Weapon/T4/ricochet","Weapon/T4/shadowWeave","Weapon/T4/silencer","Weapon/T4/spiritualOverflow","Weapon/T4/vampiricBurst"
        ],
        "Vitality Items" : ["Vitality/T1/enduringSpirit","Vitality/T1/extraHealth","Vitality/T1/extraRegen","Vitality/T1/extraStamina","Vitality/T1/healingRite","Vitality/T1/meleeLifesteal","Vitality/T1/sprintBoots",
            "Vitality/T2/bulletArmor","Vitality/T2/bulletLifesteal","Vitality/T2/combatBarrier","Vitality/T2/debuffReducer","Vitality/T2/divineBarrier","Vitality/T2/enchantersBarrier","Vitality/T2/enduringSpeed","Vitality/T2/healbane","Vitality/T2/healingBooster","Vitality/T2/healthNova","Vitality/T2/reactiveBarrier","Vitality/T2/restorativeLocker","Vitality/T2/returnFire","Vitality/T2/spiritArmor","Vitality/T2/spiritLifesteal",
            "Vitality/T3/debuffRemover","Vitality/T3/fortitude","Vitality/T3/improvedBulletArmor","Vitality/T3/improvedSpiritArmor","Vitality/T3/lifestrike","Vitality/T3/majesticLeap","Vitality/T3/metalSkin","Vitality/T3/rescueBeam","Vitality/T3/superiorStamina","Vitality/T3/veilWalker",
            "Vitality/T4/colossus","Vitality/T4/inhibitor","Vitality/T4/leech","Vitality/T4/phantomStrike","Vitality/T4/siphonBullets","Vitality/T4/soulRebirth","Vitality/T4/unstoppable"

        ],
        "Spirit Items" : ["Spirit/T1/ammoScavenger","Spirit/T1/extraCharge","Spirit/T1/extraSpirit","Spirit/T1/infuser","Spirit/T1/mysticBurst","Spirit/T1/mysticReach","Spirit/T1/spiritStrike",
            "Spirit/T2/bulletResistShredder","Spirit/T2/coldFront","Spirit/T2/decay","Spirit/T2/durationExtender","Spirit/T2/improvedCooldown","Spirit/T2/mysticVulnerability","Spirit/T2/quicksilverReload","Spirit/T2/slowingHex","Spirit/T2/suppressor","Spirit/T2/witheringWhip",
            "Spirit/T3/ArcaneSurge","Spirit/T3/etherealShift","Spirit/T3/improvedBurst","Spirit/T3/improvedReach","Spirit/T3/improvedSpirit","Spirit/T3/knockdown","Spirit/T3/mysticSlow","Spirit/T3/rapidRecharge","Spirit/T3/silenceGlyph","Spirit/T3/superiorCooldown","Spirit/T3/superiorDuration","Spirit/T3/surgeOfPower","Spirit/T3/tormentPulse",
            "Spirit/T4/boundlessSpirit","Spirit/T4/curse","Spirit/T4/divinersKevlar","Spirit/T4/echoShard","Spirit/T4/escalatingExposure","Spirit/T4/magicCarpet","Spirit/T4/mysticReverb","Spirit/T4/refresher",
        ],
        "Custom Items" : ["CustomItems/HeartTaker","CustomItems/LightningFists"]*/
        "Weapon Items" : ["New/Weapon/T1/BasicMagazine.png","New/Weapon/T1/CloseQuarters.png","New/Weapon/T1/HeadshotBooster.png","New/Weapon/T1/HighVelocityRounds.png","New/Weapon/T1/MonsterRounds.png","New/Weapon/T1/RapidRounds.png","New/Weapon/T1/RestorativeShot.png",
            "New/Weapon/T2/ActiveReload.png","New/Weapon/T2/Backstabber.png","New/Weapon/T2/Fleetfoot.png","New/Weapon/T2/IntensifyingMagazine.png","New/Weapon/T2/KineticDash.png","New/Weapon/T2/LongRange.png","New/Weapon/T2/MeleeCharge.png","New/Weapon/T2/MysticShot.png","New/Weapon/T2/OpeningRounds.png","New/Weapon/T2/SlowingBullets.png","New/Weapon/T2/SpiritShredderBullets.png","New/Weapon/T2/SplitShot.png","New/Weapon/T2/TitanicMagazine.png","New/Weapon/T2/WeakeningHeadshot.png",
            "New/Weapon/T3/AlchemicalFire.png","New/Weapon/T3/Berserker.png","New/Weapon/T3/BloodTribute.png","New/Weapon/T3/BurstFire.png","New/Weapon/T3/CultistSacrifice.png","New/Weapon/T3/EscalatingResilience.png","New/Weapon/T3/ExpressShot.png","New/Weapon/T3/Headhunter.png","New/Weapon/T3/HeroicAura.png","New/Weapon/T3/HollowPoint.png","New/Weapon/T3/HuntersAura.png","New/Weapon/T3/PointBlank.png","New/Weapon/T3/Sharpshooter.png","New/Weapon/T3/SpiritRend.png","New/Weapon/T3/SwiftStriker.png","New/Weapon/T3/TeslaBullets.png","New/Weapon/T3/ToxicBullets.png","New/Weapon/T3/WeightedShots.png",
            "New/Weapon/T4/ArmorPiercingRounds.png","New/Weapon/T4/Capacitor.png","New/Weapon/T4/CripplingHeadshot.png","New/Weapon/T4/CrushingFists.png","New/Weapon/T4/Frenzy.png","New/Weapon/T4/GlassCannon.png","New/Weapon/T4/LuckyShot.png","New/Weapon/T4/Ricochet.png","New/Weapon/T4/ShadowWeave.png","New/Weapon/T4/Silencer.png","New/Weapon/T4/Spellslinger.png","New/Weapon/T4/SpiritualOverflow.png",
        ],
        "Vitality Items" : ["New/Vitality/T1/ExtraHealth.png","New/Vitality/T1/ExtraRegen.png","New/Vitality/T1/ExtraStamina.png","New/Vitality/T1/HealingRite.png","New/Vitality/T1/MeleeLifesteal.png","New/Vitality/T1/Rebuttal.png","New/Vitality/T1/SprintBoots.png",
            "New/Vitality/T2/BattleVest.png","New/Vitality/T2/BulletLifesteal.png","New/Vitality/T2/DebuffReducer.png","New/Vitality/T2/EnchantersEmblem.png","New/Vitality/T2/EnduringSpeed.png","New/Vitality/T2/GuardingWard.png","New/Vitality/T2/Healbane.png","New/Vitality/T2/HealingBooster.png","New/Vitality/T2/HealingNova.png","New/Vitality/T2/ReactiveBarrier.png","New/Vitality/T2/RestorativeLocket.png","New/Vitality/T2/ReturnFire.png","New/Vitality/T2/SpiritLifesteal.png","New/Vitality/T2/SpiritShielding.png","New/Vitality/T2/WeaponShielding.png",
            "New/Vitality/T3/BulletResilience.png","New/Vitality/T3/Counterspell.png","New/Vitality/T3/DebuffRemover.png","New/Vitality/T3/Fortitude.png","New/Vitality/T3/FuryTrance.png","New/Vitality/T3/Lifestrike.png","New/Vitality/T3/MajesticLeap.png","New/Vitality/T3/MetalSkin.png","New/Vitality/T3/RescueBeam.png","New/Vitality/T3/SpiritResilience.png","New/Vitality/T3/StaminaMastery.png","New/Vitality/T3/TrophyCollector.png","New/Vitality/T3/VeilWalker.png","New/Vitality/T3/WarpStone.png",
            "New/Vitality/T4/CheatDeath.png","New/Vitality/T4/Colossus.png","New/Vitality/T4/DivineBarrier.png","New/Vitality/T4/HealingTempo.png","New/Vitality/T4/Infuser.png","New/Vitality/T4/Inhibitor.png","New/Vitality/T4/Juggernaut.png","New/Vitality/T4/Leech.png","New/Vitality/T4/PhantomStrike.png","New/Vitality/T4/PlatedArmor.png","New/Vitality/T4/SiphonBullets.png","New/Vitality/T4/Spellbreaker.png","New/Vitality/T4/Unstoppable.png","New/Vitality/T4/VampiricBurst.png","New/Vitality/T4/Witchmail.png",
        ],
        "Spirit Items" : ["New/Spirit/T1/ExtraCharge.png","New/Spirit/T1/ExtraSpirit.png","New/Spirit/T1/MysticBurst.png","New/Spirit/T1/MysticReach.png","New/Spirit/T1/MysticRegen.png","New/Spirit/T1/RustedBarrel.png","New/Spirit/T1/SpiritStrike.png",
            "New/Spirit/T2/ArcaneSurge.png","New/Spirit/T2/BulletResistShredder.png","New/Spirit/T2/ColdFront.png","New/Spirit/T2/DurationExtender.png","New/Spirit/T2/ImprovedCooldown.png","New/Spirit/T2/ImprovedSpirit.png","New/Spirit/T2/MysticSlow.png","New/Spirit/T2/MysticVulnerability.png","New/Spirit/T2/QuicksilverReload.png","New/Spirit/T2/SlowingHex.png","New/Spirit/T2/SpiritSap.png","New/Spirit/T2/Suppressor.png",
            "New/Spirit/T3/Decay.png","New/Spirit/T3/DisarmingHex.png","New/Spirit/T3/GreaterExpansion.png","New/Spirit/T3/Knockdown.png","New/Spirit/T3/RapidRecharge.png","New/Spirit/T3/SilenceWave.png","New/Spirit/T3/SpiritSnatch.png","New/Spirit/T3/SuperiorCooldown.png","New/Spirit/T3/SuperiorDuration.png","New/Spirit/T3/SurgeOfPower.png","New/Spirit/T3/Tankbuster.png","New/Spirit/T3/TormentPulse.png",
            "New/Spirit/T4/ArcticBlast.png","New/Spirit/T4/BoundlessSpirit.png","New/Spirit/T4/Curse.png","New/Spirit/T4/DivinersKevlar.png","New/Spirit/T4/EchoShard.png","New/Spirit/T4/EscalatingExposure.png","New/Spirit/T4/EtherealShift.png","New/Spirit/T4/FocusLens.png","New/Spirit/T4/LightningScroll.png","New/Spirit/T4/MagicCarpet.png","New/Spirit/T4/MercurialMagnum.png","New/Spirit/T4/MysticReverb.png","New/Spirit/T4/Refresher.png","New/Spirit/T4/Scourge.png","New/Spirit/T4/SpiritBurn.png","New/Spirit/T4/VortexWeb.png",
        ]
    }

    function SelectIcon(iconName, element){
        var place = JSON.parse(localStorage.getItem("currentValue"))
        var path = JSON.parse(localStorage.getItem("currentPath"))
        var index = JSON.parse(localStorage.getItem("currentIndex"))
        var arrayPlace = JSON.parse(localStorage.getItem("currentArrayPlace"))
        var dict = Utils.GetCurrentItemDict()["ItemComponent_"+index]

        if(!iconName.endsWith(".svg") && !iconName.endsWith(".png") && iconName != "") iconName = iconName + ".svg"
        
        if (place == null){
            Utils.SetDictionaryArray(dict, path, iconName == "" ? "" : "./publicIcons/"+iconName, 0)
        }
        else{
            Utils.SetDictionaryArray(dict, path+".A"+place, iconName == "" ? "" : "./publicIcons/"+iconName, arrayPlace)
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
                        {e == "" ? "" : <img className={e.endsWith(".svg")? "IconSelectImage" : ""} title={e} src={"./publicIcons/"+e} style={{width:"28px", height:"28px", position:"relative", top:"2px",}}/>}
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
                values.defaultValue == "" || values.defaultValue == undefined ? "" : <img className={JSON.stringify(values.defaultValue).endsWith(".svg")? "IconSelectImage" : ""} src={values.defaultValue} style={{width:"20px", height:"20px", marginRight:"5px", alignSelf:"center"}}/>
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