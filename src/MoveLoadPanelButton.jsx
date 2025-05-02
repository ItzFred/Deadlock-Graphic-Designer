import './LoadPanel.css'
import ColorPalette from './ColorPalette'
import Utils from './Utils'

function MoveLoadPanelButton(values){

    function ChangePos(itemName){
        var arr = JSON.parse(localStorage.getItem("Items"))
        var num = arr.indexOf(values.item)
        Utils.ArrayMove(arr, num, values.direction == "up"? num == 0? 0 : num-1 : num == (arr.length-1)? arr.length-1 : num+1)
        localStorage.setItem("Items", JSON.stringify(arr))
        window.dispatchEvent(new Event("itemComponent"))
    }

    return(
        <button class="MoveLoadPanelButton" style={{
            backgroundColor: values.col == undefined? ColorPalette.GetColor("DescriptionPanel", "Weapon") : 
                        ColorPalette.GetColor("AdjustmentDetailsPanel", values.col, values.col == "Custom"? values.customColor : null),
            top: values.direction == "up"? "5px" : "30px",
            maskImage:"url(./SmallArrow.svg)",
            maskRepeat:"no-repeat",
            rotate: values.direction == "up"? "0deg" : "180deg"
        }} onClick={e => {ChangePos(e); e.stopPropagation()}}/>
    )
}

export default MoveLoadPanelButton