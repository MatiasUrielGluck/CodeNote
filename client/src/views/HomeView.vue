<template>
  <div class="external-window">
     <!-- Delete window -->
    <div class="internal-window" :class="hiddenDeleteWindow ? 'hidden-window' : ''" v-if="selectedDeleteItem">
      <div class="delete-window">
        <h1>Delete {{selectedDeleteItemType}}</h1>
        <p>Are you sure you want to delete "{{selectedDeleteItem.name}}"?</p>
        <div class="action-container">
          <button @click="deleteItem()">Delete</button>
          <button @click="toggleDeleteWindow()">Cancel</button>
        </div>
      </div>
    </div>

    <!-- New folder window -->
    <div class="internal-window" :class="hiddenFolderWindow ? 'hidden-window' : ''">
      <div class="new-folder-window">
        <h1>New folder</h1>
        <input type="text" placeholder="Enter the folder name here" v-model="newFolderName">
        <p :class="showError">{{noteWindowError}}</p>
        <div class="action-container">
          <button @click="createFolder()">Create</button>
          <button @click="toggleFolderWindow()">Cancel</button>
        </div>
      </div>
    </div>

    <!-- New note window -->
    <div class="internal-window" :class="hiddenNoteWindow ? 'hidden-window' : ''">
      <div class="new-folder-window">
        <h1>New note</h1>
        <input type="text" placeholder="Enter the note name here" v-model="newNoteName">
        <p :class="showError">{{noteWindowError}}</p>
        <div class="action-container">
          <button @click="createNote()">Create</button>
          <button @click="toggleNoteWindow()">Cancel</button>
        </div>
      </div>
    </div>
    
    <i class="close-panel fa-solid fa-circle-xmark fa-xl" v-if="showCloseBtn" @click="togglePanel()"></i>
    <!-- Panel Section -->
    <div class="panel-col" :class="panel">
      <!-- Folders -->
      <div class="folder-col">
        <div class="title-box">
          <p>Folders</p>
          <div class="icons-container">
            <i class="fa-solid fa-arrow-down-short-wide"></i>
            <i class="fa-solid fa-magnifying-glass"></i>
            <i class="fa-solid fa-trash-can" @click="toggleDeleteWindow('folder')"></i>
          </div>
        </div>
        <div class="items-container" v-for="(folder, index) in folders" :key="index">
          <div class="item" :class="selectedFolder === folder? 'selected': ''" @click="selectNote(folder)">
            <p>{{folder.name}}</p>
          </div>
        </div>
        <div class="new-box" @click="toggleFolderWindow()">
          <p>New folder</p>
        </div>
      </div>

      <!-- Notes -->
      <div class="notes-col">
        <div class="title-box">
          <p>Notes</p>
          <div class="icons-container">
            <i class="fa-solid fa-arrow-down-short-wide"></i>
            <i class="fa-solid fa-magnifying-glass"></i>
            <i class="fa-solid fa-trash-can" @click="toggleDeleteWindow('note')"></i>
          </div>
        </div>
       <div class="items-container" v-for="(note, index) in notes" :key="index">
          <div class="item" :class="selectedNote === note? 'selected': ''" @click="selectContent(note)">
            <p>{{note.name}}</p>
          </div>
        </div>
        <div class="new-box"  @click="toggleNoteWindow()">
          <p>New note</p>
        </div>
      </div>
    </div>

    <!-- ACTUAL NOTE -->
    <div class="content-col" :class="content">
      <div class="toolbox">
        <div class="left-col">
          <i class="fa-solid fa-eye close-btn" @click="togglePanel()"></i>
        </div>
        <div class="center-col">
          <div class="tools-section">
            <input type="color" name="foreColor" id="foreColor" @change="changeColor()">
          </div>
          <div class="tools-section">
            <button class="no-style"><i class="fa-solid fa-bold" @click="action('bold', false, null)"></i></button>
            <button class="no-style"><i class="fa-solid fa-italic" @click="action('italic', false, null)"></i></button>
            <button class="no-style"><i class="fa-solid fa-underline" @click="action('underline', false, null)"></i></button>
          </div>
          <div class="tools-section">
            <select>
              <option>3</option>
            </select>
          </div>
          <div class="tools-section">
            <button class="no-style"><i class="fa-solid fa-code"></i></button>
          </div>

          <div class="tools-section">
            <button class="no-style"><i class="fa-solid fa-align-left" @click="action('justifyLeft', false, null)"></i></button>
            <button class="no-style"><i class="fa-solid fa-align-center" @click="action('justifyCenter', false, null)"></i></button>
            <button class="no-style"><i class="fa-solid fa-align-right" @click="action('justifyRight', false, null)"></i></button>
            <button class="no-style"><i class="fa-solid fa-align-justify" @click="action('justifyFull', false, null)"></i></button>
          </div>

          <div class="tools-section">
            <button class="no-style" @click="action('insertUnorderedList', false, null)"><i class="fa-solid fa-list"></i></button>
            <button class="no-style" @click="action('insertOrderedList', false, null)"><i class="fa-solid fa-list-ol"></i></button>
            <button class="no-style" @click="addCheckbox()"><i class="fa-solid fa-square-check"></i></button>
            <button class="no-style"><i class="fa-solid fa-image"></i></button>
          </div>
        </div>
        <div class="right-col">
          <i class="fa-solid fa-circle-user fa-xl"></i>
        </div>
      </div>

      <div class="editor" id="editor" contenteditable="true" @input="updateHTML" @click="changeColor()"></div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
// @ is an alias to /src
import foldersApi from '../services/foldersApi'
import notesApi from '../services/notesApi'

export default {
  name: 'HomeView',
  
  data: function() {
    return {
      panel: '',
      content: '',
      showCloseBtn: false,
      folders: store.state.folders,
      selectedFolder: null,
      selectedNote: null,
      notes: [],
      hiddenFolderWindow: 'hidden-window',
      newFolderName: '',
      showError: '',
      noteWindowError: 'Please, enter a folder name',
      hiddenNoteWindow: 'hidden-window',
      newNoteName: '',
      hiddenDeleteWindow: 'hidden-window',
      selectedDeleteItem: null,
      selectedDeleteItemType: '',
    }
  },

  async beforeMount() {
    let res = await foldersApi.getFolders()
    store.state.folders = res.data
    this.folders = store.state.folders
    document.querySelector('#foreColor').value = '#ffffff'
  },

  created() {
    window.addEventListener("resize", this.resize);
    this.resize()
  },

  destroyed() {
    window.removeEventListener("resize", this.resize);
  },

  watch: {
    
  },

  methods: {
    async getData() {
      let res = await foldersApi.getFolders()
      res = await foldersApi.getFolders() // getFolders again to force the Api retrive the correct data
      store.state.folders = res.data
      this.folders = store.state.folders
    },

    resize() {
      if (window.innerWidth <= 1050) {
        this.showCloseBtn = true
      } else {
        this.showCloseBtn = false
      }
    },

    togglePanel() {
      if (this.panel === '') {
        this.panel = 'hidden-panel'
        this.content = 'extended-content'
        this.showCloseBtn = false
      } else {
        this.panel = ''
        this.content = ''
        if (window.innerWidth <= 1050) {
          setTimeout(() => {
            this.showCloseBtn = true
            }, 400);
        }
      }
    },

    selectNote(folder) {
      this.selectedFolder = folder
      this.notes = folder.notes
    },

    selectContent(note) {
      this.selectedNote = note
      this.selectedContent = document.querySelector('#editor').innerHTML = note.content
    },

    action(cmd, bool, value) {
      document.execCommand(cmd, bool, value)
      document.querySelector('#editor').focus()
    },

    addCheckbox() {
      document.querySelector('#editor').innerHTML += '<input type="checkbox"/>'
      document.querySelector('#editor').focus()
    },

    changeColor() {
      let color = document.querySelector('#foreColor').value
      document.execCommand('foreColor', false, color)
      this.action('foreColor', false, color)
    },

    updateHTML() {
      this.selectedContent = document.querySelector('#editor').innerHTML
    },

    // Window actions

    toggleDeleteWindow(type) {
      if (this.hiddenDeleteWindow === '') {
        this.hiddenDeleteWindow = 'hidden-window'
        this.selectedDeleteItem = null
      } else {
        this.hiddenDeleteWindow = ''
        if (type === 'folder') {
          this.selectedDeleteItem = this.selectedFolder
          this.selectedDeleteItemType = 'folder'
        } else {
          this.selectedDeleteItem = this.selectedNote
          this.selectedDeleteItemType = 'note'
        }
      }
    },

    toggleFolderWindow() {
      if (this.hiddenFolderWindow === '') {
        this.hiddenFolderWindow = 'hidden-window'
        this.newFolderName = ''
      } else {
        this.hiddenFolderWindow = ''
      }
    },

    toggleNoteWindow() {
      this.showError = ''
      if (this.hiddenNoteWindow === '') {
        this.hiddenNoteWindow = 'hidden-window'
        this.newNoteName = ''
      } else {
        this.hiddenNoteWindow = ''
      }
    },

    deleteItem() {
      if (this.selectedDeleteItemType === 'folder') {
        foldersApi.deleteFolder(this.selectedDeleteItem._id)

      } else if (this.selectedDeleteItemType === 'note') {
        console.log('delete the note here')
      }

      this.getData()
      this.toggleDeleteWindow()
    },

    async createFolder() {
      if (!this.newFolderName) {
        this.showError = 'error'
        return
      } else {
        // Conect to the backend to create the new folder
        await foldersApi.createFolder({
          name: this.newFolderName
        })

        this.showError = ''
        this.newFolderName = ''
        this.getData()
        this.toggleFolderWindow()
      }
    },

    async createNote() {
      if (!this.selectedFolder) {
        this.noteWindowError = 'Select a folder first'
        this.showError = 'error'
        return
      }
      else if (!this.newNoteName) {
        this.noteWindowError = 'Please, enter a folder name'
        this.showError = 'error'
        return
      } else {
        // Conect to the backend to create the new note
        await notesApi.createNote(this.selectedFolder._id, {
          name: this.newNoteName
        })

        this.showError = ''
        this.newNoteName = ''
        this.getData()
        this.toggleNoteWindow()
      }
    }
  }
}
</script>

<style scoped>
@import '../../public/styles.css';

i {
  cursor: pointer;
  color: var(--secondary-color);
}

.external-window {
  width: 100vw;
  height: 100vh;
  display: flex;
}

.panel-col {
  display: flex;
  flex-flow: row nowrap;
  height: 100vh;
  width: 40%;
  border-right: 1px solid var(--secondary-color);
  transition: all 0.4s ease-in-out;
  color: #fff !important;
}

.panel-col * {
  transition: transform 0.4s ease-in-out;
}

.content-col {
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
  width: 60%;
  transition: width 0.4s ease-in-out;
}

.extended-content {
  width: 100%;
}

/* Panel Col */
.folder-col {
  position: relative;
  width: 50%;
}

.notes-col {
  position: relative;
  width: 50%;
  border-left: 1px solid var(--secondary-color);
}

.title-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: start;
  height: 4rem;
  border-bottom: 1px solid var(--secondary-color);
}

.icons-container {
  display: flex;
  gap: 0.5rem;
}

.title-box p {
  margin-left: 1rem;
  font-size: 1.5rem;
}

.title-box .icons-container {
  position: absolute;
  right: .5rem;
}

.item {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  max-height: 4rem;
  width: 100%;
  border-bottom: 1px solid var(--secondary-color);
  overflow: scroll;
}

.item p {
  padding: 0 0.3rem;
  white-space: nowrap;
  overflow: hidden;
}

.item.selected {
  background: var(--selected-color);
}

.item.selected p {
  background: var(--selected-color);
}

.new-box {
  cursor: pointer;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  width: 100%;
  height: 4rem;
  border-top: 1px solid var(--secondary-color);
  background: #3D3F42;
}

.new-box p {
  background: #3D3F42;
  font-weight: bold;
}

/* Content Col */
.content-col .toolbox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4.50rem;
  border-bottom: 1px solid var(--secondary-color);
}

.toolbox .left-col {
  margin-left: 2rem;
}

.toolbox .right-col {
  margin-right: 2rem;
}

.toolbox .center-col {
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;
}

.toolbox .center-col .tools-section {
  display: flex;
  gap: 0.5rem;
}

.editor {
  padding: 2rem;
  height: 100%
}

.editor:focus {
  outline: none
}


.close-panel {
  position: absolute;
  top: 2rem;
  left: 1rem;
  z-index: 2;
  opacity: 100%;
  transition: all 0.2s linear;
}

.hidden {
  z-index: 2;
  transform: translateX(-200%);
  opacity: 0%;
}

.hidden-panel {
  width: 0;
  transform: translateX(-200%);
}

.hidden-panel * {
  transform: translateX(-200%);
}

.internal-window {
  position: absolute;
  z-index: 4;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(35, 36, 39, 0);
  transition: all 0.3s ease;
}

.delete-window {
  padding: 2rem;
  position: absolute;
  z-index: 5;
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
  justify-content: space-evenly;
  align-items: center;
  background: rgba(157, 157, 157, 1);
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.delete-window button:first-of-type {
  background: rgb(182, 33, 33);
}

.delete-window button:first-of-type:hover {
  background: rgb(164, 29, 29);
}

.delete-window * {
  background: rgba(157, 157, 157, 1);
}

.new-folder-window {
  padding: 2rem;
  position: absolute;
  z-index: 5;
  width: 25rem;
  height: 25rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: center;
  background: rgba(157, 157, 157, 1);
  border-radius: 16px;
  /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
  /* box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; */
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.new-folder-window * {
  background: rgba(157, 157, 157, 1);
}

.new-folder-window input {
  width: 100%;
  border: 1px solid rgba(35, 36, 39, 1);
  border-radius: 12px;
  padding: 0.5rem;
}

.new-folder-window input:focus {
  outline: none;
}

.new-folder-window p {
  color: rgb(182, 33, 33);
  opacity: 0%;
  transition: all 0.3s ease;
}

.new-folder-window p.error {
  opacity: 100%;
}

.new-folder-window button, .delete-window button {
  cursor: pointer;
  padding: 0.4rem 0.8rem;
  margin: 0 0.4rem;
  border: none;
  border-radius: 12px;
  background: #848484;
  transition: all 0.3s ease;
}

.new-folder-window button:hover, .delete-window button:hover {
  background: #707070;
}

.hidden-window {
  transform: scale(0%);
}

/* Medium devices */

@media only screen and (max-width: 1050px) {
  .panel-col {
    position: absolute;
    z-index: 1;
    width: 100vw;
    height: 100vh;
  }

  .title-box {
    justify-content: center;
  }

  .title-box p {
    margin-left: 0;
  }

  .content-col {
    width: 100%;
  }

  .toolbox .center-col {
    gap: 2rem;
  }
}

@media only screen and (max-width: 700px) {
  .toolbox .center-col {
    gap: 1rem;
  }
}

/* Small devices */
@media only screen and (max-width: 600px) {
  .title-box {
    flex-flow: column nowrap;
  }

  .title-box .icons-container {
    position: relative;
  }

  .toolbox .center-col {
    transform: translateY(-200%);
  }

  .close-panel {
    left: 0rem;
  }
}
</style>
