# Computer Graphics - Exercise 5 - WebGL Basketball Court

## Group Members

- Ella Bar Yaacov 308217264
- Hagar Dolev 309840841

## How to Run Your Implementation

### Prerequisites

- Node.js installed on your machine
- Modern web browser with WebGL support

### Running the Application

1. Clone this repository to your local machine
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Start the local web server: `node index.js`
5. Open your browser and go to http://localhost:8000

### Controls

- **O Key**: Toggle orbit camera controls
- **C Key**: Cycle through camera preset positions
- **Mouse**: Orbit camera (when enabled)
- **Scroll**: Zoom camera

## Additional Features Implemented

### Enhanced Visual Features
All bonus options were implemented, including:
- **Realistic Court Texturing**: High-quality parquet flooring texture with normal maps and roughness maps for realistic wood appearance
- **Stadium Environment**: Complete stadium with bleachers, scoreboard
- **Enhanced Basketball**: Realistic basketball texture with proper orange color and black seams
- **Detailed Hoop Construction**: Realistic basketball hoops with transparent backboards, orange rims, and detailed net implementation using line segments

### Camera System

- **Multiple Camera Presets**: 6 different camera positions including default, side view, top view, hoop view, court level, and behind hoop
- **Smooth Camera Transitions**: Easy switching between preset views
- **Interactive Controls**: Toggle-able orbit controls with mouse and scroll support

### UI Framework

- **On-Screen Controls Display**: display of available controls and current camera view

## Sources of External Assets Used

### Textures and Materials

- **Parquet Flooring Textures**: From the "ParquetFlooring06_MR_4K" texture set

  - Source: https://cgbookcase-volume.b-cdn.net/t/ParquetFlooring06_MR_4K.zip
  - Base Color: `ParquetFlooring06_4K_BaseColor.png`
  - Normal Map: `ParquetFlooring06_4K_Normal.png`
  - Roughness Map: `ParquetFlooring06_4K_Roughness.png`
  - Height Map: `ParquetFlooring06_4K_Height.png`
  - Source: High-quality PBR texture set for realistic wood flooring

- **Basketball Texture**: `balldimpled.png`
  - Source: https://opengameart.org/content/basket-ball-texture
  - Realistic basketball texture with proper orange color and black seam lines
  - Used for the static basketball at center court

## Complete Instructions

**All detailed instructions, requirements, and specifications can be found in:**
`basketball_exercise_instructions.html`
