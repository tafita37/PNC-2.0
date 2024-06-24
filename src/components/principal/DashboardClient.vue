<script setup>
import BeginComponent from '../reusable/BeginComponent.vue';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { onMounted, ref } from 'vue';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const pieChart = ref(null);

const legendContainer = ref(null);

var myChart = ref(null);

onMounted(() => {
    const chartData = {
        labels: ['SAMIFIN', 'BIANCO', 'DGD', 'COMGN', 'DGPN', 'DGI'],
        datasets: [
            {
                label: 'Nombre',
                data: [110, 0, 11, 41, 25, 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    myChart = new ChartJS(pieChart.value, {
        type: 'pie',
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    // position: 'bottom',
                    display: false
                },
                title: {
                    display: true,
                    text: "Statistique d'infraction"
                }
            }
        }
    });

    // Générer une légende personnalisée
    chartData.labels.forEach((label, index) => {
        const legendItem = document.createElement('li');
        legendItem.style.display="flex";
        legendItem.style.alignItems = "center";
        const colorBox = document.createElement('span');
        colorBox.style.backgroundColor = chartData.datasets[0].backgroundColor[index];
        colorBox.style.backgroundColor = chartData.datasets[0].backgroundColor[index];
        colorBox.style.display = "inline-block"; // Ajouter style display inline-block à l'élément span
        colorBox.style.width = "15px"; // Définir la largeur du span
        colorBox.style.height = "15px"; // Définir la hauteur du span
        colorBox.style.marginRight = "8px"; // Ajouter une marge à droite du span
        legendItem.appendChild(colorBox);
        legendItem.appendChild(document.createTextNode(label));
        legendContainer.value.appendChild(legendItem);
    });
});

// const legendItems = myChart.generateLegend();
// legendContainer.value.innerHTML = legendItems;
</script>
<template>
    <div class="wrapper">
        <BeginComponent />
        <main role="main" class="main-content">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-12">
                        <div class="row align-items-center my-2">
                            <div class="col-auto ml-auto">
                                <form class="form-inline">
                                    <div class="form-group">
                                        <label for="reportrange" class="sr-only">Date Ranges</label>
                                        <div id="reportrange" class="px-2 py-2 text-muted">
                                            <i class="fe fe-calendar fe-16 mx-2"></i>
                                            <span class="small"></span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <button type="button" class="btn btn-sm"><span
                                                class="fe fe-refresh-ccw fe-12 text-muted"></span></button>
                                        <button type="button" class="btn btn-sm"><span
                                                class="fe fe-filter fe-12 text-muted"></span></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <!-- charts-->
                        <div class="row my-4">
                            <div class="col-md-12">
                                <div class="chart-box">
                                    <div id="columnChart"></div>
                                </div>
                            </div> <!-- .col -->
                        </div> <!-- end section -->
                        <!-- info small box -->
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card shadow mb-4">
                                    <div class="card-body">
                                        <div class="card-title">
                                            <strong>Products</strong>
                                            <a class="float-right small text-muted" href="#!">View all</a>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-5">
                                                <div id="chart-box">
                                                    <div id="donutChartWidget">
                                                        <canvas ref="pieChart"></canvas>
                                                    </div>
                                                </div>
                                                <ul class="custom-legend" ref="legendContainer"></ul>
                                            </div>
                                            <div class="col-md-7">
                                                <div class="row align-items-center my-3">
                                                    <div class="col">
                                                        <strong>SAMIFIN</strong>
                                                        <div class="my-0 text-muted small">SERVICE DE RENSEIGNEMENTS
                                                            FINANCIERS</div>
                                                    </div>
                                                    <div class="col-auto">
                                                        <strong>58.82%</strong>
                                                    </div>
                                                    <div class="col-3">
                                                        <div class="progress" style="height: 4px;">
                                                            <div class="progress-bar" role="progressbar"
                                                                style="width: 58.82%" aria-valuenow="85"
                                                                aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row align-items-center my-3">
                                                    <div class="col">
                                                        <strong>BIANCO</strong>
                                                        <div class="my-0 text-muted small">BUREAU INDEPENDANT
                                                            ANTI-CORRUPTION</div>
                                                    </div>
                                                    <div class="col-auto">
                                                        <strong>0%</strong>
                                                    </div>
                                                    <div class="col-3">
                                                        <div class="progress" style="height: 4px;">
                                                            <div class="progress-bar" role="progressbar"
                                                                style="width: 0%" aria-valuenow="75" aria-valuemin="0"
                                                                aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row align-items-center my-3">
                                                    <div class="col">
                                                        <strong>DGD</strong>
                                                        <div class="my-0 text-muted small">DIRECTION GENERALE DES
                                                            DOUANES</div>
                                                    </div>
                                                    <div class="col-auto">
                                                        <strong>5.88%</strong>
                                                    </div>
                                                    <div class="col-3">
                                                        <div class="progress" style="height: 4px;">
                                                            <div class="progress-bar" role="progressbar"
                                                                style="width: 5.88%" aria-valuenow="62"
                                                                aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row align-items-center my-3">
                                                    <div class="col">
                                                        <strong>COMGN</strong>
                                                        <div class="my-0 text-muted small">COMMANDEMENT DE LA
                                                            GENDARMERIE NATIONALE</div>
                                                    </div>
                                                    <div class="col-auto">
                                                        <strong>21.93%</strong>
                                                    </div>
                                                    <div class="col-3">
                                                        <div class="progress" style="height: 4px;">
                                                            <div class="progress-bar" role="progressbar"
                                                                style="width: 21.93%" aria-valuenow="62"
                                                                aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row align-items-center my-3">
                                                    <div class="col">
                                                        <strong>DGPN</strong>
                                                        <div class="my-0 text-muted small">DIRECTION GENERALE DE LA
                                                            POLICE NATIONALE</div>
                                                    </div>
                                                    <div class="col-auto">
                                                        <strong>13.37%</strong>
                                                    </div>
                                                    <div class="col-3">
                                                        <div class="progress" style="height: 4px;">
                                                            <div class="progress-bar" role="progressbar"
                                                                style="width: 13.37%" aria-valuenow="62"
                                                                aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row align-items-center my-3">
                                                    <div class="col">
                                                        <strong>DGI</strong>
                                                        <div class="my-0 text-muted small">DIRECTION GENERALE DES IMPOTS
                                                        </div>
                                                    </div>
                                                    <div class="col-auto">
                                                        <strong>0%</strong>
                                                    </div>
                                                    <div class="col-3">
                                                        <div class="progress" style="height: 4px;">
                                                            <div class="progress-bar" role="progressbar"
                                                                style="width: 0%" aria-valuenow="62" aria-valuemin="0"
                                                                aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> <!-- .col-md-12 -->
                                        </div> <!-- .row -->
                                    </div> <!-- .card-body -->
                                </div> <!-- .card -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<style scoped>
canvas {
    max-width: 90%;
    max-height: 300px;
}

.custom-legend {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
  list-style: none;
  padding: 0;
}
</style>