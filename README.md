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
초기에는 부산교통공사에서 제공된 지하철 노선도 이미지를 활용하여, React의 Image Mapper 라이브러리를 사용해 사용자가 지하철 노선도에서 특정 역을 클릭하면 해당 역의 상세 정보를 제공하는 인터페이스를 구현했습니다. 그러나 프로젝트 진행 중 동해선과 부산김해경전철의 데이터가 부족하여, 해당 노선들을 제외하고 Figma를 사용하여 1, 2, 3, 4호선만 포함된 새로운 노선도를 직접 제작하였습니다.
<img src="https://github.com/jwkim97211/project1/blob/main/assets/image.png">
<img src="https://github.com/jwkim97211/project1/blob/main/assets/figma.png">

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
