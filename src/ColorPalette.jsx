import Utils from "./Utils"

class ColorPalette{
    static WeaponColors = {
        TitleText : "#fbefd7",
        TitleShadowText : "#b8701d",
        Text : "#cac0b9",
        DarkText : "#c4b49e",
        PassiveText : "#c4b49e",
        TitlePanel : "#ca7b1b",
        TitlePanelStatTop : "#a3641a",
        TitlePanelStatBottom : "#875516",
        ComponentsPanel : "#9e6419",
        ComponentsTextPanel : "#7e5215",
        ComponentsIconPanel : "#e9981b",
        ComponentsIcon : "#59401f",
        PassivePanel : "#523d21",
        DescriptionPanel : "#7f5717",
        StatTablePanel : "#64461c",
        ComponentsOfPanel : "#6f4c16",
        ComponentsOfTextPanel : "#523d21",
        ComponentsOfIconPanel : "#f9d38e",
        ComponentsOfIcon : "#9e6419",
        AdjustmentDetailsPanel : "#53412a",
        AdjustmentDetailsLine : "#463828",

        ComponentsIconStyle : "brightness(0) saturate(100%) invert(26%) sepia(26%) saturate(850%) hue-rotate(354deg) brightness(95%) contrast(99%)",
        ComponentsOfIconStyle : "invert(36%) sepia(41%) saturate(911%) hue-rotate(354deg) brightness(103%) contrast(87%)"
    }

    static VitalityColors = {
        TitleText : "#fbefd7",
        TitleShadowText : "#628924",
        Text : "#cccccc",
        DarkText : "#a4b099",
        PassiveText : "#abb49e",
        TitlePanel : "#6b9727",
        TitlePanelStatTop : "#567a20",
        TitlePanelStatBottom : "#46661a",
        ComponentsPanel : "#2a3120",
        ComponentsTextPanel : "#1e231b",
        ComponentsIconPanel : "#7fba26",
        ComponentsIcon : "#424845",
        PassivePanel : "#344124",
        DescriptionPanel : "#51721d",
        StatTablePanel : "#425b1f",
        ComponentsOfPanel : "#46641a",
        ComponentsOfTextPanel : "#3a4a23",
        ComponentsOfIconPanel : "#7fba26",
        ComponentsOfIcon : "#4f6740",
        AdjustmentDetailsPanel : "#394f2b",
        AdjustmentDetailsLine : "#334329",

        ComponentsIconStyle : "brightness(0) saturate(100%) invert(22%) sepia(0%) saturate(6152%) hue-rotate(205deg) brightness(95%) contrast(81%)",
        ComponentsOfIconStyle : "invert(34%) sepia(45%) saturate(324%) hue-rotate(53deg) brightness(97%) contrast(92%)"
    }

    static SpiritColors = {
        TitleText : "#fbefd7",
        TitleShadowText : "#79519a",
        Text : "#c6bfcf",
        DarkText : "#a99db6",
        PassiveText : "#c1b2a8",
        TitlePanel : "#815a9f",
        TitlePanelStatTop : "#6f458f",
        TitlePanelStatBottom : "#5c3778",
        ComponentsPanel : "#362445",
        ComponentsTextPanel : "#251d2c",
        ComponentsIconPanel : "#af98c3",
        ComponentsIcon : "#583c6f",
        PassivePanel : "#3a2250",
        DescriptionPanel : "#623585",
        StatTablePanel : "#4e2a6b",
        ComponentsOfPanel : "#542d74",
        ComponentsOfTextPanel : "#43235d",
        ComponentsOfIconPanel : "#d6cae1",
        ComponentsOfIcon : "#815a9f",
        AdjustmentDetailsPanel : "#44305f",
        AdjustmentDetailsLine : "#3b2a52",

        ComponentsIconStyle : "brightness(0) saturate(100%) invert(26%) sepia(17%) saturate(1555%) hue-rotate(230deg) brightness(91%) contrast(90%)",
        ComponentsOfIconStyle : "invert(41%) sepia(11%) saturate(2096%) hue-rotate(231deg) brightness(92%) contrast(86%)"
    }

    static CustomColors = {

        TitleText : "#fbefd7",
        TitleShadowText : "#c0c0c0",
        Text : "#f7f3f0",
        DarkText : "#c8c0bc",
        PassiveText : "#9a948e",
        TitlePanel : "#e5e5e5",
        TitlePanelStatTop : "#bfc0c0",
        TitlePanelStatBottom : "#9b9d9e",
        ComponentsPanel : "#bab9b9",
        ComponentsTextPanel : "#949696",
        ComponentsIconPanel : "#ffffff",
        ComponentsIcon : "#777979",
        PassivePanel : "#727272",
        DescriptionPanel : "#989a9a",
        StatTablePanel : "#7f8080",
        ComponentsOfPanel : "#858686",
        ComponentsOfTextPanel : "#707070",
        ComponentsOfIconPanel : "#ffffff",
        ComponentsOfIcon : "#bab9b9",
        AdjustmentDetailsPanel : "#7d7e7e",
        AdjustmentDetailsLine : "#6e6e6e",

        ComponentsIconStyle : "brightness(0) saturate(100%) invert(100%)",
        ComponentsOfIconStyle : "invert(11%) sepia(23%) saturate(8%) hue-rotate(22deg) brightness(95%) contrast(77%)"
    }

    static IconColors = {
        Weapon : "invert(57%) sepia(81%) saturate(504%) hue-rotate(355deg) brightness(97%) contrast(87%)",
        Vitality : "invert(73%) sepia(60%) saturate(840%) hue-rotate(94deg) brightness(101%) contrast(105%)",
        Spirit : "invert(73%) sepia(64%) saturate(3817%) hue-rotate(217deg) brightness(105%) contrast(101%)",
        Gray : "invert(69%) sepia(7%) saturate(468%) hue-rotate(51deg) brightness(93%) contrast(90%)",
        Soul : "invert(91%) sepia(21%) saturate(203%) hue-rotate(95deg) brightness(93%) contrast(91%)"
    }

    static GetIconColor(colorName){
        if (colorName == undefined || colorName == null || !Object.keys(this.IconColors).includes(colorName)) return this.IconColors.Weapon
        return this.IconColors[colorName]
    }

    static GetScalingColor(ColorName, CustomColor, opacity, Panel){
        switch (ColorName){
            case "None": return "rgba(0, 0, 0, 0)"
            case "Spirit": if (Panel) return "rgba(124, 86, 153, "+opacity+")"; else return "rgba(124, 86, 153, "+opacity+")"
            case "Weapon": if (Panel) return "rgba(128, 85, 15, "+opacity+")"; else return "rgba(124, 86, 153, "+opacity+")"
            case "Melee": if (Panel) return "rgba(128, 85, 15, "+opacity+")"; else return "rgba(124, 86, 153, "+opacity+")"
            case "Health": if (Panel) return "rgba(60, 112, 43, "+opacity+")"; else return "rgba(124, 86, 153, "+opacity+")"
        }
        if (CustomColor == null || CustomColor == undefined) return "rgba(0, 0, 0, 0)"
        var color = Utils.hexToRgb(CustomColor)
        return "rgba("+color.r+", "+color.g+", "+color.b+", "+opacity+")"
    }

    static GetColor(colorName, palette = null, customColor = null){
        var pal = "Weapon"
        if (palette == null || palette == undefined) pal = Utils.GetCurrentItemDict()["ColorPalette"]
        else pal = palette

        if (pal == "Weapon" || pal == "Vitality" || pal == "Spirit"){
            return this[pal+"Colors"][colorName]
        }
        else if (pal == undefined || pal == null){
            return this["WeaponColors"][colorName]
        }
        else{
            if (colorName == "TitleText") return [pal+"Colors"]["TitleText"]
            if (colorName == "ComponentsIconStyle") return [pal+"Colors"]["ComponentsIconStyle"]
            if (colorName == "ComponentsOfIconStyle") return [pal+"Colors"]["ComponentsOfIconStyle"]

            var pulledColor = customColor == null? Utils.GetCurrentItemDict()["CustomColor"] : customColor
            var color = Utils.hexToRgb((pulledColor == null || pulledColor == undefined)? "#ffffff" : pulledColor)
            var BWColor = Utils.hexToRgb(this.CustomColors[colorName])
            var newColorRGB
            if (colorName == "Text" || colorName == "DarkText" || colorName == "PassiveText"){
                newColorRGB = {
                    r : Utils.lerp( color.r * (BWColor.r / 255.0), BWColor.r, 0.6),
                    g : Utils.lerp( color.g * (BWColor.g / 255.0), BWColor.g, 0.6),
                    b : Utils.lerp( color.b * (BWColor.b / 255.0), BWColor.b, 0.6),
                }
            }
            else{
                newColorRGB = {
                    r : color.r * (BWColor.r / 255.0),
                    g : color.g * (BWColor.g / 255.0),
                    b : color.b * (BWColor.b / 255.0),
                }
            }
            return Utils.rgbToHex(newColorRGB.r, newColorRGB.g, newColorRGB.b)
        }
    }
}

export default ColorPalette