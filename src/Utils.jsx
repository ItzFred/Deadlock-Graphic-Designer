import ColorPalette from "./ColorPalette";

import SpiritScalingIcon from "./assets/icons/SpiritScaling.svg"
import WeaponScalingIcon from "./assets/icons/WeaponScaling.svg"
import MeleeScalingIcon from "./assets/icons/MeleeScaling.svg"
import HealthScalingIcon from "./assets/icons/HealthScaling.svg"

class Utils{
    static SetDictionary = (obj, path, val) => { 
        const keys = path.split('.');
        const lastKey = keys.pop();
        const lastObj = keys.reduce((obj, key) => 
            obj[key] = obj[key] || {}, 
            obj); 
        lastObj[lastKey] = val;
    };

    static SetDictionaryArray = (obj, path, val, arrayIndex) => { 
        const keys = path.split('.');
        const lastKey = keys.pop();
        const lastObj = keys.reduce((obj, key) => 
            obj[key] = obj[key] || {}, 
            obj); 
        if(lastObj[lastKey] == null)
        {
            lastObj[lastKey] = []
            lastObj[lastKey][arrayIndex] = val;
        } else {
            lastObj[lastKey][arrayIndex] = val;
        }
    };

    static GetLocalStorageDictionary = (localStorageValue) => {
        var dict = {}
        if (localStorage.getItem(localStorageValue) !== null && localStorage.getItem(localStorageValue) != "{}"){
            dict = JSON.parse(localStorage.getItem(localStorageValue))
        }
        else if (localStorage.getItem(localStorageValue) == null) return null
        return dict
    }

    static GetCurrentItemDict() {
        if (localStorage.getItem("CurrentItem") == null) localStorage.setItem("CurrentItem", crypto.randomUUID())

        if (localStorage.getItem(localStorage.getItem("CurrentItem")) == null) localStorage.setItem(localStorage.getItem("CurrentItem"), "{}")
        return JSON.parse(localStorage.getItem(localStorage.getItem("CurrentItem")))
    }

    static SetCurrentItemDictKey(key, value){
        var dict = this.GetCurrentItemDict()
        dict[key] = value
        localStorage.setItem(localStorage.getItem("CurrentItem"), JSON.stringify(dict))

    }

    static SetCurrentItemDict(key){
        localStorage.setItem(localStorage.getItem("CurrentItem"), JSON.stringify(key))
    }

    static ArrayMove = (array,from,to) => {
        array.splice(to,0,array.splice(from,1)[0]);
        return array;
    };

    static ArrayDelete(array, index){
        
    }

    static hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
    }

    static rgbToHex(r, g, b) {
        return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
    }

    static lerp( a, b, alpha ) {
        return a + alpha * (b - a)
    }

    static GetScalingIcon(scalingName){
        switch (scalingName){
            case "Spirit": return <img src={SpiritScalingIcon} style={{width:"42px", position:"relative", left:"-31px", top:"-5px"}}/>
            case "Melee": return <img src={MeleeScalingIcon} style={{width:"36px", position:"relative", left:"-31px", top:"-3px"}}/>
            case "Weapon": return <img src={WeaponScalingIcon} style={{width:"36px", position:"relative", left:"-31px", top:"-3px"}}/>
            case "Health": return <img src={HealthScalingIcon} style={{width:"40px", position:"relative", left:"-31px", top:"-3px"}}/>
        }
        return ""
    }

    static markdown(text) {
        if (text == undefined || text == null || text == "") return {__html: ""}

        var bold = /\*\*(.*?)\*\*/gm;
        var white = /\[\[(.*?)\]\]/gm;
        var dark = /\(\((.*?)\)\)/gm;
        var darker = /\{\{(.*?)\}\}/gm;
        var italic = /\_\_(.*?)\_\_/gm;
        var HTMLArrow = /\<(.*?)\>/gm;
        var colorCodes = {
            "$1" : /\[(#[a-f,0-9]{6}),(.*?)\]/gm,
            "#ec981a" : /\[(weapon),(.*?)\]/gm,
            "#00ff9a" : /\[(vitality),(.*?)\]/gm,
            "#ce91ff" : /\[(spirit),(.*?)\]/gm,
            "#c1e0d0" : /\[(soul),(.*?)\]/gm,
            "#ff6b6b" : /\[(red),(.*?)\]/gm,
        }    

        var lightColor = "#ffffff"
        var darkColor = ColorPalette.GetColor("DarkText")
        var symbols = /([&?=.@$%!^":;'+/\-])/gm;

        var newtext = ""

        newtext = text
        newtext = newtext.replace( HTMLArrow, '' );
        newtext = newtext.replace( /\\n/g, '<br>');
        newtext = newtext.replace( symbols, '<span style="font-family:NotoSans; font-weight:bold">$1</span>')
        newtext = newtext.replace( bold, '<span style="font-weight:bold">$1</span>');
        newtext = newtext.replace( italic, '<span style="font-style:italic">$1</span>');

        for (var i = 0; i < Object.keys(colorCodes).length; i++){
            if (i == 0) newtext = newtext.replace( Object.values(colorCodes)[i], '<span style="color:$1">$2</span>');
            else newtext = newtext.replace( Object.values(colorCodes)[i], '<span style="color:'+Object.keys(colorCodes)[i]+'">$2</span>');
        }

        newtext = newtext.replace( white, '<span style="color:'+lightColor+'">$1</span>' );
        newtext = newtext.replace( dark, '<span style="color:'+darkColor+'">$1</span>' );
        newtext = newtext.replace( darker, '<span style="color:'+darkColor+'; opacity:0.6">$1</span>' );



        return {__html: newtext}
    }
}

export default Utils