import Utils from "./Utils"

class ColorPalette{
    static WeaponColors = {
        TitleText : "#ffefd7",
        TitleShadowText : "#b76f03",
        Text : "#cdcdcd",
        DarkText : "#b5a599",
        SubtitleText : "#988169",
        PassiveText : "#c4b49e",
        TitlePanel : "#c97a03",
        TitlePanelStatTop : "#a36202",
        TitlePanelStatBottom : "#885101",
        ComponentsPanel : "#9e630c",
        ComponentsTextPanel : "#7f4f08",
        ComponentsIconPanel : "#ec981a",
        ComponentsIcon : "#5e3e09",
        PassivePanel : "#583b0e",
        DescriptionPanel : "#80550f",
        StatTablePanel : "#67430a",
        ComponentsOfPanel : "#704a0c",
        ComponentsOfTextPanel : "#5a3a08",
        ComponentsOfIconPanel : "#ffd28e",
        ComponentsOfIcon : "#9e630c",
        AdjustmentDetailsPanel : "#574124",
        AdjustmentDetailsLine : "#4c3920",

        ComponentsIconStyle : "brightness(0) invert(18%) sepia(58%) saturate(545%) hue-rotate(355deg) brightness(89%) contrast(82%)",
        ComponentsOfIconStyle : "brightness(0) invert(32%) sepia(88%) saturate(792%) hue-rotate(8deg) brightness(101%) contrast(91%)"
    }

    static VitalityColors = {
        TitleText : "#ffefd7",
        TitleShadowText : "#5b8a15",
        Text : "#cdcdcd",
        DarkText : "#a3af99",
        SubtitleText : "#7c8b5f",
        PassiveText : "#bfb79f",
        TitlePanel : "#659818",
        TitlePanelStatTop : "#507a11",
        TitlePanelStatBottom : "#41650c",
        ComponentsPanel : "#203500",
        ComponentsTextPanel : "#182900",
        ComponentsIconPanel : "#7cbb1e",
        ComponentsIcon : "#424845",
        PassivePanel : "#354f11",
        DescriptionPanel : "#4d7214",
        StatTablePanel : "#3d5b0e",
        ComponentsOfPanel : "#436310",
        ComponentsOfTextPanel : "#334d0b",
        ComponentsOfIconPanel : "#7cbb1e",
        ComponentsOfIcon : "#4f6740",
        AdjustmentDetailsPanel : "#365225",
        AdjustmentDetailsLine : "#304821",

        ComponentsIconStyle : "brightness(0) invert(26%) sepia(2%) saturate(1880%) hue-rotate(98deg) brightness(89%) contrast(84%)",
        ComponentsOfIconStyle : "brightness(0) invert(35%) sepia(35%) saturate(451%) hue-rotate(53deg) brightness(94%) contrast(86%)"
    }

    static SpiritColors = {
        TitleText : "#ffefd7",
        TitleShadowText : "#7e4ea4",
        Text : "#cdcdcd",
        DarkText : "#a99db7",
        SubtitleText : "#897695",
        PassiveText : "#c1b2a8",
        TitlePanel : "#8b56b4",
        TitlePanelStatTop : "#704491",
        TitlePanelStatBottom : "#5c3778",
        ComponentsPanel : "#372248",
        ComponentsTextPanel : "#2b1939",
        ComponentsIconPanel : "#ce91ff",
        ComponentsIcon : "#583b6f",
        PassivePanel : "#3b2250",
        DescriptionPanel : "#623585",
        StatTablePanel : "#4e296b",
        ComponentsOfPanel : "#552d74",
        ComponentsOfTextPanel : "#43235d",
        ComponentsOfIconPanel : "#e7c9ff",
        ComponentsOfIcon : "#8b56b4",
        AdjustmentDetailsPanel : "#44305f",
        AdjustmentDetailsLine : "#3c2a53",

        ComponentsIconStyle : "brightness(0) invert(25%) sepia(18%) saturate(1736%) hue-rotate(230deg) brightness(89%) contrast(85%)",
        ComponentsOfIconStyle : "brightness(0) invert(40%) sepia(12%) saturate(2642%) hue-rotate(231deg) brightness(96%) contrast(85%)"
    }

    static CustomColors = {

        TitleText : "#fbefd7",
        TitleShadowText : "#c0c0c0",
        Text : "#f7f3f0",
        DarkText : "#c8c0bc",
        SubtitleText : "#A6A6A6",
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
        Weapon : "invert(58%) sepia(49%) saturate(1335%) hue-rotate(356deg) brightness(107%) contrast(85%)",
        Vitality : "invert(79%) sepia(38%) saturate(2485%) hue-rotate(95deg) brightness(102%) contrast(105%)",
        Spirit : "invert(63%) sepia(35%) saturate(1039%) hue-rotate(216deg) brightness(100%) contrast(103%)",
        Gray : "invert(80%) sepia(0%) saturate(1345%) hue-rotate(143deg) brightness(88%) contrast(80%)",
        Soul : "invert(78%) sepia(30%) saturate(416%) hue-rotate(100deg) brightness(111%) contrast(101%)",
        Red : "invert(72%) sepia(69%) saturate(4331%) hue-rotate(318deg) brightness(101%) contrast(109%)",
        Yellow : "invert(76%) sepia(100%) saturate(3163%) hue-rotate(359deg) brightness(103%) contrast(105%)"
    }

    static IconHexColors = {
        Weapon : "#ec981a",
        Vitality : "#00ff9a",
        Spirit : "#ce91ff",
        Gray : "#a9a9a9",
        Soul : "#9affd6",
        Red : "#ff6c69",
        Yellow : "#ffd400"
    }

    static GetIconColor(colorName){
        if (colorName == undefined || colorName == null || !Object.keys(this.IconColors).includes(colorName)) return this.IconColors.Weapon
        return this.IconColors[colorName]
    }

    static GetScalingColor(ColorName, CustomColor, opacity, Panel){
        switch (ColorName){
            case "None": return "rgba(0, 0, 0, 0)"
            case "Spirit": if (Panel) return "rgba(98, 53, 133, "+opacity+")"; else return "rgba(98, 53, 133, "+opacity+")"
            case "Weapon": if (Panel) return "rgba(128, 85, 15, "+opacity+")"; else return "rgba(128, 85, 15, "+opacity+")"
            case "Melee": if (Panel) return "rgba(128, 85, 15, "+opacity+")"; else return "rgba(128, 85, 15, "+opacity+")"
            case "Health": if (Panel) return "rgba(60, 112, 43, "+opacity+")"; else return "rgba(60, 112, 43, "+opacity+")"
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
            if (colorName == "Text" || colorName == "DarkText" || colorName == "PassiveText" || colorName == "SubtitleText"){
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