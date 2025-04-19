import './LoadPanel.css'
import Utils from './Utils'
import ColorPalette from './ColorPalette'
import TrashIcon from './assets/icons/TrashCanIcon.svg'

function RemoveButton(values){
    function Remove(element){

        var items = JSON.parse(localStorage.getItem("Items"))
        items.splice(items.indexOf(values.item), 1)
        localStorage.setItem("Items", JSON.stringify(items))
        localStorage.removeItem(values.item)

        window.dispatchEvent(new Event("itemComponent"))
        window.dispatchEvent(new Event("displayLoadPanel"))
        element.stopPropagation()
    }
    
    return (
        <button className="DeleteButton" style={{
            backgroundColor: values.col == undefined? ColorPalette.GetColor("DescriptionPanel", "Weapon") : 
                        ColorPalette.GetColor("AdjustmentDetailsPanel", values.col, values.col == "Custom"? values.customColor : null),
        }} onClick={elem => Remove(elem)}><img src={TrashIcon} style={{ position:"relative", top:"-2px"}}/></button>
    )
}

export default RemoveButton