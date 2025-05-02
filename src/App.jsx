import PartCreator from './PartCreator.jsx'
import ItemComponentEditor from './ItemComponentEditor.jsx'
import ItemComponent from './ItemComponent.jsx'
import websiteLogo from './assets/WebsiteLogoNew.svg'
import './index.css'
import './ComponentList.css'
import Utils from './Utils.jsx'
import { useEffect, useState, useRef, useCallback, createElement } from 'react'
import React from 'react'
import ColorPalettePicker from './ColorPalettePicker.jsx'
import { domToPng } from 'modern-screenshot'
import { saveAs } from 'file-saver'
import InfoOverlay from './InfoOverlay.jsx'
import LoadPanel from './LoadPanel.jsx'
import DefaultItem from '/public/templateItems/DeadlockGraphicDesigner.json'

function App() {

  const [storedComponents, SetStoredComponents] = useState(Utils.GetCurrentItemDict()["itemComponents"] == undefined? 
    Utils.SetCurrentItemDictKey("itemComponents", {}) : 
    Utils.GetCurrentItemDict()["itemComponents"])
  const [itemName, SetItemName] = useState("")
  const [selectedElement, SetSelectedElement] = useState(localStorage.getItem("selectedElement") === null? {} : localStorage.getItem("selectedElement"))


  useEffect(() => {
    function setEffectComponents() {
      SetItemName(Utils.GetCurrentItemDict()["ItemName"] == undefined ? "" : Utils.GetCurrentItemDict()["ItemName"])
      SetStoredComponents(Utils.GetCurrentItemDict()["itemComponents"]??{})    
      var input = document.getElementById("ItemNameInput")
      input.value = Utils.GetCurrentItemDict()["ItemName"] == undefined? "Item" : Utils.GetCurrentItemDict()["ItemName"]
      window.dispatchEvent(new Event("ComponentsUpdated"))
    }

    if (localStorage.getItem("SelectedItemComponent") === null) localStorage.setItem("SelectedItemComponent", "Title")
    if (Utils.GetCurrentItemDict()["ColorPalette"] === undefined) Utils.SetCurrentItemDictKey("ColorPalette", "Weapon")
    if (Utils.GetCurrentItemDict()["ItemName"] === undefined) {
      Utils.SetCurrentItemDictKey("ItemName", "Item")  
    }

    if (localStorage.getItem("Items") == null || localStorage.getItem("Items") == undefined) 
    {
      //Load the default item if the site is used for the first time
      var newItem = crypto.randomUUID()
      localStorage.setItem("CurrentItem", newItem)
      localStorage.setItem(newItem, JSON.stringify(DefaultItem))

      SetItemName(Utils.GetCurrentItemDict()["ItemName"] ?? "")

      if (localStorage.getItem("Items") == null) localStorage.setItem("Items", '['+JSON.stringify(newItem)+']')
      else {
        var items = JSON.parse(localStorage.getItem("Items"))
        if (!items.includes(newItem)) items.push(newItem)
        localStorage.setItem("Items", JSON.stringify(items))
      }

      setEffectComponents()
    }


    window.addEventListener("itemComponent", setEffectComponents);
    return () => {
      window.removeEventListener("itemComponents", setEffectComponents);
    };

  }, [])
  

  function GetComponents(componentType = "work"){

    var currentItem = localStorage.getItem("CurrentItem")

    if (componentType == "work"){
      let components = []
      Object.entries(storedComponents).map(([k, v]) => {
        components.push(<ItemComponentEditor key={k} index={k} itemID={currentItem} title={v[0]}/>)
      })
      window.dispatchEvent(new Event("ComponentsUpdated"))
      return components
    }
    else if (componentType == "preview"){
      let previewComponents = []
      var placementnum = 0
      Object.entries(storedComponents).map(([k, v]) => {
        previewComponents.push(<ItemComponent key={k} index={k} itemID={currentItem} title={v[0]} placement={placementnum} listSize={Object.keys(storedComponents).length}/>)
        placementnum++
      })
      window.dispatchEvent(new Event("ComponentsUpdated"))
      return previewComponents
    }
  
  }

  const handleChange = (e) => {
    SetSelectedElement(e.target.value)
    localStorage.setItem("SelectedItemComponent", e.target.value)
  };

  function onButtonClick(){
    domToPng(document.getElementById("CaptureArea"), {fixSvgXmlDecode:true, scale:4}).then(dataUrl => {
      saveAs(dataUrl, (Utils.GetCurrentItemDict()["ItemName"]?? "Item") + ".png")
    })
  }

  function SaveItem(saveData){
    if (localStorage.getItem("CurrentItem") === null) localStorage.setItem("CurrentItem", crypto.randomUUID())

    if (Utils.GetCurrentItemDict() === null){
      var items = JSON.parse(localStorage.getItem("itemComponents"))
      if (saveData != "" && saveData != undefined && saveData != null){
        var currentItem = {"ItemName" : saveData.target.value}
        Utils.SetCurrentItemDict(currentItem)
      }
    }
    else{
      var items = Utils.GetCurrentItemDict()
      if (saveData != "" && saveData != undefined && saveData != null){
        items["ItemName"] = saveData.target.value
        Utils.SetCurrentItemDict(items)
      }
    }

    if (localStorage.getItem("Items") == null || localStorage.getItem("Items") == undefined) localStorage.setItem("Items", '['+JSON.stringify(localStorage.getItem("CurrentItem"))+']')
    else {
      var items = JSON.parse(localStorage.getItem("Items"))
      var currentItem = localStorage.getItem("CurrentItem")
      if (!items.includes(currentItem)) items.push(currentItem)
      localStorage.setItem("Items", JSON.stringify(items))
    }
  }

  function ExportJSON(){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(Utils.GetCurrentItemDict()));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    var fileName = Utils.GetCurrentItemDict()["ItemName"]
    downloadAnchorNode.setAttribute("download", (fileName ?? "ItemName") + ".txt");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  function ImportJSON(){
    var input = document.createElement("input")
    input.type = "file"
    input.multiple = true
    input.onchange = e => {
      for (var i = 0; i < input.files.length; i++){
        var file = input.files[i]
        if (file){
          var reader = new FileReader()
          reader.readAsText(file, "UTF-8")
          reader.onload = evt => {
  
            var newCurrentItem = crypto.randomUUID()
            var itemData = Utils.JumblePartNames(JSON.parse(evt.target.result))
  
            localStorage.setItem("CurrentItem", newCurrentItem)
            localStorage.setItem(newCurrentItem, JSON.stringify(itemData))
  
            SetItemName(Utils.GetCurrentItemDict()["ItemName"] ?? "")
            window.dispatchEvent(new Event("itemComponent"));
  
            if (localStorage.getItem("Items") == null) localStorage.setItem("Items", '['+JSON.stringify(newCurrentItem)+']')
            else {
              var items = JSON.parse(localStorage.getItem("Items"))
              if (!items.includes(newCurrentItem)) items.push(newCurrentItem)
              localStorage.setItem("Items", JSON.stringify(items))
            }
          }
          reader.onerror = evt => {
            alert("Couldn't Read file")
          }
        }
      }
    }
    input.click()
  }

  function CreateNewitem(){
    localStorage.setItem("CurrentItem", crypto.randomUUID())
    SetStoredComponents({})

    window.dispatchEvent(new Event("itemComponent"));
    SaveItem("")
  }

  function CopyItem(){
    var itemData = Utils.GetCurrentItemDict()
    itemData = Utils.JumblePartNames(itemData)

    var newCurrentItem = crypto.randomUUID()
    localStorage.setItem("CurrentItem", newCurrentItem)
    localStorage.setItem(newCurrentItem, JSON.stringify(itemData))

    SetItemName(itemData["ItemName"] ?? "")
    window.dispatchEvent(new Event("itemComponent"));

    if (localStorage.getItem("Items") == null) localStorage.setItem("Items", '['+JSON.stringify(newCurrentItem)+']')
      else {
        var items = JSON.parse(localStorage.getItem("Items"))
        if (!items.includes(newCurrentItem)) items.push(newCurrentItem)
        localStorage.setItem("Items", JSON.stringify(items))
      }
  }

  return (
    <>
      <div class="HBox">
        <div class="VBox" style={{height:"10%"}}>
          <img src={websiteLogo} className="logo" alt="Website logo"/>
          <select name="GraphicType">
            <option value="Item">Item</option>
          </select>
          <ColorPalettePicker/>
          <div style={{display:"flex", justifyContent:"flex-end", alignSelf:"center", textAlign:"center", height:"10%", width:"100%", padding:"20px"}}>
            <label>Item Name: <input type="text" id="ItemNameInput" defaultValue={itemName} onChange={e => {SaveItem(e); window.dispatchEvent(new Event("itemComponent"))}} style={{width:"63%", backgroundColor:"#1A1A1A"}}></input></label>
            <button className='DarkButton' style={{width:"7%"}} onClick={ImportJSON}>Import Data</button>
            <button className='DarkButton' style={{width:"7%"}} onClick={ExportJSON}>Export Data</button>
            <button className='DarkButton' style={{width:"7%"}} onClick={() => window.dispatchEvent(new Event("displayLoadPanel"))}>Load</button>
            <button className='DarkButton' style={{width:"7%"}} onClick={onButtonClick}>Save Image</button>
            <button className='DarkButton' style={{width:"7%"}} onClick={CreateNewitem}>New Item</button>
            <button className='DarkButton' style={{width:"7%"}} onClick={CopyItem}>Copy Item</button>
          </div>
        </div>
        <div class="VBox">
          <div class="workArea">
            <div class="VBox">
              <PartCreator/>
              <form>
                <select name="ComponentType" onChange={handleChange} defaultValue={localStorage.getItem("SelectedItemComponent")}>
                  <option value="Title">Title</option>
                  <option value="Components">Components</option>
                  <option value="Stats">Stats</option>
                  <option value="Cooldown">Cooldown</option>
                  <option value="Description">Description</option>
                  <option value="StatTableRow">Stat Table Row</option>
                  <option value="ComponentOf">Component Of</option>
                </select>
              </form>
            </div>
            {GetComponents("work")}
          </div>
          <div class="previewArea" id="previewArea">
            <div id="CaptureArea">
            {GetComponents("preview")}
            <button className='DarkButton' style={{
              position:"absolute",
              width:"100px",
              height:"40px",
              borderRadius:"20px",
              zIndex:"10",
              right:"20px",
              bottom:"20px",
              fontFamily:"NotoSans",
              fontWeight:"700",
            }} onClick={() => window.dispatchEvent(new Event("displayInfoOverlay"))}>Info ?</button>
            </div>
          </div>
        </div>
        <InfoOverlay/>
        <LoadPanel/>
      </div>  
    </>
  )
}

export default App
