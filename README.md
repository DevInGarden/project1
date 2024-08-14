## 지하철 객실 내 CCTV를 이용한 실시간 혼잡도 알림 서비스 프로젝트

> 이 프로젝트는 승객들이 지하철 혼잡도를 사전에 확인할 수 있도록 하여, 혼잡한 시간대를 피하거나 적절한 차량을 선택하는 데 도움을 주는 것을 목표로 합니다. 이를 통해 승객의 편의성과 안전성을 높이고, 대중교통 이용률을 증가시켜 교통 혼잡을 줄이며, 전체적인 대중교통 효율성을 개선하는 선순환을 이루고자 합니다. ([시연영상](https://youtu.be/ifACPxiXOsM))

### 개발기간
2024.06.03 ~ 2024.06.28(1개월)

### 프로젝트 팀 구성 및 역할
|프론트엔드|백엔드|
|:---:|:---:|
|김정원|장민우|
|[<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">](https://github.com/DevInGarden)|[<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">](https://github.com/minwoowow)|

### 개발 과정
- 사용자가 선택한 출발역에 도착 중인 열차와 다음에 도착할 열차의 정보를 실시간으로 제공합니다. 각 열차의 호차별 혼잡도를 시각적으로 표시하여 사용자가 현재 열차의 혼잡 상황과 호차별 빈자리 상태를 한눈에 알 수 있습니다. 각 호선의 차량 수 차이를 고려하여 호선마다 서로 다른 기준으로 혼잡도를 계산하고 표시하였습니다. 원래는 지하철 객실 내 CCTV 이미지를 이용한 객체 탐지(Object Detection) 기술을 통해 빈자리 개수를 분석하여 서비스를 제공하려 했으나, 지하철 객실 내 CCTV 이미지를 제공받지 못해 현재는 랜덤 수를 기반으로 혼잡도를 시각화하고 있습니다.
<img src="https://github.com/jwkim97211/project1/blob/main/assets/page3.png" style="border: 2px solid black;">
<img src="https://github.com/jwkim97211/project1/blob/main/assets/page4.png">

 - 초기에는 부산교통공사에서 제공된 지하철 노선도 이미지를 활용하여, React의 Image Mapper 라이브러리를 사용해 사용자가 지하철 노선도에서 특정 역을 클릭하면 해당 역의 상세 정보를 제공하는 인터페이스를 구현했습니다. 그러나 프로젝트 진행 중 동해선과 부산김해경전철의 데이터가 부족하여, 해당 노선들을 제외하고 Figma를 사용하여 1, 2, 3, 4호선만 포함된 새로운 노선도를 직접 제작하였습니다.
<img src="https://github.com/jwkim97211/project1/blob/main/assets/image.png">
<img src="https://github.com/jwkim97211/project1/blob/main/assets/figma.png">

- 사용자가 현재 시각을 기준으로 열차 정보를 실시간으로 확인할 수 있도록 현재 날짜와 시간을 표시합니다. 사용자는 출발역과 도착역을 선택하여 두 역 사이의 실시간 열차 도착 시간, 환승역 정보, 예상 소요 시간을 확인할 수 있습니다.(Dijkstra Algorithm 사용)
<img src="https://github.com/jwkim97211/project1/blob/main/assets/page1.png">

- 카카오맵 API를 통해 도착역의 각 출구 위치와 출구별로 주요 시설 정보를 제공합니다. 사용자는 지도에서 원하는 출구로 쉽게 이동하거나 특정 시설을 찾아볼 수 있습니다. 이 기능은 사용자가 도착 후의 편리한 이동을 돕기 위해 중요한 역할을 합니다.
<img src="https://github.com/jwkim97211/project1/blob/main/assets/page2.png">

- 실내공기질 API를 통해 사용자가 선택한 출발역의 초미세먼지와 이산화탄소 값을 시각화합니다. 공기질 측정기가 없는 역의 경우 "측정 기계 없음"이라는 텍스트가 표시되며, 공기질 측정기가 있는 역은 초미세먼지와 이산화탄소 농도에 따라 다른 이모티콘과 텍스트가 나타납니다. 이를 통해 사용자는 역의 공기질 상태를 한눈에 파악할 수 있습니다.

<div align="center">
  <img src="https://github.com/jwkim97211/project1/blob/main/assets/air1.PNG" width="45%">
  <img src="https://github.com/jwkim97211/project1/blob/main/assets/air2.PNG" width="45%">
</div>

### 주요기능
1. 출발역과 도착역 선택 시 환승역 안내
2. 실시간 최단거리 및 도착시간, 소요시간 안내
3. 도착역 지도 제공
4. 타려는 열차의 혼잡도 정보 제공
5. 출발역의 미세먼지 정보 제공

### 구현 결과
#### 시작페이지
- 시작페이지
<img src="https://github.com/jwkim97211/project1/blob/main/assets/subway1.png">

#### 메인페이지
- 출발역, 도착역 선택 X
<img src="https://github.com/jwkim97211/project1/blob/main/assets/subway2.png">

- 출발역, 도착역 선택 O(출발역 미세먼지 측정기 X)
<img src="https://github.com/jwkim97211/project1/blob/main/assets/subway3.png">

- 출발역, 도착역 선택 O(출발역 미세먼지 측정기 O)
<img src="https://github.com/jwkim97211/project1/blob/main/assets/subway4.png">
