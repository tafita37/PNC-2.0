<script setup>
    import { onMounted, reactive, ref } from 'vue';
    import "@/assets/js/tinycolor-min.js";
    import FooterBegin from './../reusable/FooterBegin.vue'
    import BeginComponent from '../reusable/BeginComponent.vue';

    var ouvert = true;

    var switcher = null;

    var base = {
        defaultFontFamily: "Overpass, sans-serif",
        primaryColor: "#1b68ff",
        secondaryColor: "#4f4f4f",
        successColor: "#3ad29f",
        warningColor: "#ffc107",
        infoColor: "#17a2b8",
        dangerColor: "#dc3545",
        darkColor: "#343a40",
        lightColor: "#f2f3f6"
    };

    var extend = {
        primaryColorLight: tinycolor(base.primaryColor).lighten(10).toString(),
        primaryColorLighter: tinycolor(base.primaryColor).lighten(30).toString(),
        primaryColorDark: tinycolor(base.primaryColor).darken(10).toString(),
        primaryColorDarker: tinycolor(base.primaryColor).darken(30).toString()
    };

    var chartColors = [
        base.primaryColor,
        base.successColor,
        "#6f42c1",
        extend.primaryColorLighter
    ];

    var visiblePage = reactive([]);

    var className = "begin-content";

    var headerId = "begin-header-id";


    onMounted(() => {
        switcher = document.querySelector("#modeSwitcher");
        if (visiblePage.length != 0) {
            className = "main-content";
            headerId = "header-id";
        }
    });


    function collapse() {
        if ($(".vertical").hasClass("narrow")) {
            $(".vertical").toggleClass("open")
            console.log("here");
        }
        else {
            $(".vertical").toggleClass("collapsed"),
                $(".vertical").hasClass("hover") && $(".vertical").removeClass("hover");
            console.log($(".vertical"));
        }
        ouvert = !ouvert;
        console.log(ouvert);
    }

    function collapseOver() {
        console.log(ouvert);
        if (ouvert == false) {
            collapse();
        }
    }
</script>
<template>
    <div class="wrapper">
        <BeginComponent/>
        <!-- <DropDownMenuLeft :collapse-over-function="collapseOver" /> -->
        <main role="main">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <!-- <div id="app"></div> -->
                    <div class="col-12 mb-4">
                        <div class="col-12 mb-4">
                            <div class="card shadow">
                                <div class="card-header">
                                    <p class="h2 mb-3">
                                        PNC, un outil simple, sécurisé et rapide.
                                    </p>
                                </div>
                                <div class="card-body">
                                    <p>
                                        Le système PNC est conçu par des techniciens Malagasy et a bénéficié d'un appui
                                        financier des bailleurs de fonds
                                        notamment le PNUD et le COMESA. Elle a pour vocation de mettre à disposition des
                                        administrations spécialisées i)
                                        un fichier central numérique contenant des informations liées aux infractions
                                        détectées et communiquées par les
                                        autorités compétentes, ii) un système de communication servant à sécuriser nos
                                        échanges d’information à caractère
                                        confidentiel et iii) un tableau de bord commun mettant en exergue une
                                        cartographie de risque et des données
                                        statistiques en lien au de blanchiment des capitaux et de financement du
                                        terrorisme à Madagascar.
                                    </p>
                                    <p>
                                        Le système PNC renforce la sécurisation de nos échanges. Des normes de sécurité
                                        sont prises en compte notamment la
                                        référence ISO-2700x relatif à la sécurité des systèmes d'information.
                                    </p>
                                    <p>
                                        Le système PNC va accélérer le processus actuel en mettant à disposition des
                                        opérationnels les outils modernes.
                                        Il facilite les missions d’enquêtes, d’investigation criminelle, d’inspection
                                        et/ou de contrôle de différentes
                                        autorités.
                                    </p>
                                    <p>
                                        L’accès est conditionné par l’adhésion d’une charte accompagnée d’un formulaire
                                        d’inscription.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> <!-- .col-12 -->
            </div> <!-- .container-fluid -->
            <div class="modal fade modal-notif modal-slide" tabindex="-1" role="dialog"
                aria-labelledby="defaultModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-sm" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="defaultModalLabel">Notifications</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="list-group list-group-flush my-n3">
                                <div class="list-group-item bg-transparent">
                                    <div class="row align-items-center">
                                        <div class="col-auto">
                                            <span class="fe fe-box fe-24"></span>
                                        </div>
                                        <div class="col">
                                            <small><strong>Package has uploaded successfull</strong></small>
                                            <div class="my-0 text-muted small">Package is zipped and uploaded</div>
                                            <small class="badge badge-pill badge-light text-muted">1m ago</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="list-group-item bg-transparent">
                                    <div class="row align-items-center">
                                        <div class="col-auto">
                                            <span class="fe fe-download fe-24"></span>
                                        </div>
                                        <div class="col">
                                            <small><strong>Widgets are updated successfull</strong></small>
                                            <div class="my-0 text-muted small">Just create new layout Index, form, table
                                            </div>
                                            <small class="badge badge-pill badge-light text-muted">2m ago</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="list-group-item bg-transparent">
                                    <div class="row align-items-center">
                                        <div class="col-auto">
                                            <span class="fe fe-inbox fe-24"></span>
                                        </div>
                                        <div class="col">
                                            <small><strong>Notifications have been sent</strong></small>
                                            <div class="my-0 text-muted small">Fusce dapibus, tellus ac cursus commodo
                                            </div>
                                            <small class="badge badge-pill badge-light text-muted">30m ago</small>
                                        </div>
                                    </div> <!-- / .row -->
                                </div>
                                <div class="list-group-item bg-transparent">
                                    <div class="row align-items-center">
                                        <div class="col-auto">
                                            <span class="fe fe-link fe-24"></span>
                                        </div>
                                        <div class="col">
                                            <small><strong>Link was attached to menu</strong></small>
                                            <div class="my-0 text-muted small">New layout has been attached to the menu
                                            </div>
                                            <small class="badge badge-pill badge-light text-muted">1h ago</small>
                                        </div>
                                    </div>
                                </div> <!-- / .row -->
                            </div> <!-- / .list-group -->
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary btn-block" data-dismiss="modal">Clear
                                All</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade modal-shortcut modal-slide" tabindex="-1" role="dialog"
                aria-labelledby="defaultModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="defaultModalLabel">Shortcuts</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body px-5">
                            <div class="row align-items-center">
                                <div class="col-6 text-center">
                                    <div class="squircle bg-success justify-content-center">
                                        <i class="fe fe-cpu fe-32 align-self-center text-white"></i>
                                    </div>
                                    <p>Control area</p>
                                </div>
                                <div class="col-6 text-center">
                                    <div class="squircle bg-primary justify-content-center">
                                        <i class="fe fe-activity fe-32 align-self-center text-white"></i>
                                    </div>
                                    <p>Activity</p>
                                </div>
                            </div>
                            <div class="row align-items-center">
                                <div class="col-6 text-center">
                                    <div class="squircle bg-primary justify-content-center">
                                        <i class="fe fe-droplet fe-32 align-self-center text-white"></i>
                                    </div>
                                    <p>Droplet</p>
                                </div>
                                <div class="col-6 text-center">
                                    <div class="squircle bg-primary justify-content-center">
                                        <i class="fe fe-upload-cloud fe-32 align-self-center text-white"></i>
                                    </div>
                                    <p>Upload</p>
                                </div>
                            </div>
                            <div class="row align-items-center">
                                <div class="col-6 text-center">
                                    <div class="squircle bg-primary justify-content-center">
                                        <i class="fe fe-users fe-32 align-self-center text-white"></i>
                                    </div>
                                    <p>Users</p>
                                </div>
                                <div class="col-6 text-center">
                                    <div class="squircle bg-primary justify-content-center">
                                        <i class="fe fe-settings fe-32 align-self-center text-white"></i>
                                    </div>
                                    <p>Settings</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <FooterBegin />
    </div>
</template>
<style></style>