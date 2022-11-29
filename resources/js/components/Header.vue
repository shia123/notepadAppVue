<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                File
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a class="dropdown-item" href="#" @click="resetForm">
                    <font-awesome-icon
                      icon="fa-regular fa-file "
                      class="icon"
                    />New</a
                  >
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#filesModal"
                    @click="getFiles"
                  >
                    <font-awesome-icon
                      icon="fa-regular fa-file "
                      class="icon"
                    />Open</a
                  >
                </li>
                <li v-if="!fileId">
                  <a
                    class="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#saveModal"
                    href="#"
                  >
                    <font-awesome-icon
                      icon="fa-solid fa-download"
                      class="icon"
                    />Save</a
                  >
                </li>
                <li v-if="fileId">
                  <a class="dropdown-item" href="#" @click="saveNote">
                    <font-awesome-icon
                      icon="fa-solid fa-download"
                      class="icon"
                    />Save</a
                  >
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="#"
                    @click="saveAsNote"
                    data-bs-toggle="modal"
                    data-bs-target="#saveModal"
                  >
                    <font-awesome-icon
                      icon="fa-solid fa-download"
                      class="icon"
                    />Save as</a
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#"> Edit </a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#"> View </a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#"> Help </a>
            </li>
            <li class="nav-item dropdown icon">
              <font-awesome-icon icon="fa-regular fa-copy" class="addedIcons" />
            </li>
            <li class="nav-item dropdown icon">
              <font-awesome-icon
                icon="fa-regular fa-clipboard "
                class="addedIcons"
              />
            </li>
            <li class="nav-item dropdown icon">
              <font-awesome-icon
                icon="fa-solid fa-rotate-left"
                class="addedIcons"
              />
            </li>
            <li class="nav-item dropdown icon">
              <font-awesome-icon
                icon="fa-solid fa-rotate-right"
                class="addedIcons"
              />
            </li>
            <li class="nav-item dropdown icon">
              <font-awesome-icon
                icon="fa-solid fa-magnifying-glass-plus"
                class="addedIcons"
              />
            </li>
            <li class="nav-item dropdown icon">
              <font-awesome-icon
                icon="fa-solid fa-magnifying-glass-minus"
                class="addedIcons"
              />
            </li>
          </ul>
        </div>
      </div>

      <!-- Modal -->
      <div
        class="modal fade"
        id="saveModal"
        tabindex="-1"
        aria-labelledby="saveModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="saveModalLabel">Save File?</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-body">
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Filename"
                  v-model="filename"
                  required
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                @click="saveNote"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- files modal -->
      <div
        class="modal fade"
        id="filesModal"
        tabindex="-1"
        aria-labelledby="filesModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="filesModalLabel">Saved Files</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-body">
              <h1 v-if="loading">Loading....</h1>
              <div v-if="!loading">
                <div class="card" v-for="item in fileList" :key="item.id">
                  <div class="card-body">
                    {{ item.file_name }}
                  </div>
                  <button
                    type="button"
                    @click="getData(item)"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- end of files modal -->
    </nav>
    <div class="alert alert-danger" role="alert" v-if="error">
      {{ error }}
    </div>
    <Notes v-model:noteDetails="noteDetails" v-if="!loading" />
    <h1 v-if="loading">Loading....</h1>
  </div>
</template>

<script>
import Notes from "../components/Notes.vue";
import axios from "axios";
export default {
  components: { Notes },
  emits: ["update:noteDetails"],
  data() {
    return {
      noteDetails: this.noteDetails,
      loading: null,
      filename: "",
      fileId: "",
      fileList: null,
      error: null,
    };
  },
  methods: {
    resetForm() {
      this.noteDetails = "";
      this.filename = null;
      this.fileId = null;
    },
    getData(item) {
      this.noteDetails = item.note_details;
      this.fileId = item.id;
    },
    saveNote() {
      if (this.filename === "") {
        this.error = "Filename is required";
      } else {
        this.error = null;
        this.loading = true;
        axios
          .post("/api/save-file", {
            file_id: this.filename ? null : this.fileId,
            file_name: this.fileId ? null : this.filename,
            note_details: this.noteDetails,
          })
          .then((response) => {
            console.log(response);

            this.resetForm();
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.noteDetails = "";
            this.filename = "";
            this.error = error;
            this.loading = false;
          });
      }
    },
    saveAsNote() {
      this.fileId = null;
    },
    getFiles() {
      this.loading = true;
      this.noteDetails = "";
      this.filename = null;
      this.fileId = null;
      axios
        .get("/api/notes")
        .then((response) => {
          console.log(response);
          this.fileList = response.data;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.error = error;
          this.loading = false;
        });
    },
  },
};
</script>

<style>
.navbar-toggler {
  display: flex;
  justify-content: flex-end;
}
.icon {
  margin-right: 0.5rem;
}
.addedIcons {
  height: 2rem;
  padding: 0.5rem;
}
</style>