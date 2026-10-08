/* Programming 5
 * CSCI 4611, Fall 2026, University of Minnesota
 * Instructor: Evan Suma Rosenberg <suma@umn.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'

export class App extends gfx.GfxApp
{
    private ground: gfx.Mesh3;
    private skybox: gfx.Mesh3;

    private cameraControls: gfx.FirstPersonControls;

    // --- Create the App class ---
    constructor()
    {
        // initialize the base class gfx.GfxApp
        super();

        this.ground = gfx.Geometry3Factory.createBox(10, 1, 10);
        this.skybox = gfx.Geometry3Factory.createBox(100, 100, 100);

        this.cameraControls = new gfx.FirstPersonControls(this.camera);
    }


    // --- Initialize the graphics scene ---
    createScene(): void 
    {
        // Setup the camera projection matrix and position.
        // We will learn more about camera models later in this course.
        this.camera.setPerspectiveCamera(60, 1920/1080, 0.1, 100);

        // Note that in a right-handed coordinate system, the camera looks down the -z axis.
        // The camera is positioned 1.5m above the ground and 10m in the +z direction,
        // so that an object placed at the origin will be visible in the camera's view.
        this.camera.position.set(0, 1.5, 5);

        // Create an ambient light that illuminates everything in the scene
        const ambientLight = new gfx.AmbientLight(new gfx.Color(0.4, 0.4, 0.4));
        
        // Create a directional light that is infinitely far away (sunlight)
        const directionalLight = new gfx.DirectionalLight(new gfx.Color(0.6, 0.6, 0.6));
        directionalLight.position.set(1, 2, 1);

        // A Gouraud material is a type of material that uses per-vertex lighting.
        // It produces less realistic results than per-pixel lighting, but is more computationally efficient.
        const groundMaterial = new gfx.GouraudMaterial();
        groundMaterial.texture = new gfx.Texture("./PavingStones070_2K-JPG_Color.jpg");

        // Set the position of the ground to be 0.5m below the origin, so that the top of the ground is at y=0.
        this.ground.position.set(0, -.5, 0);
        this.ground.material = groundMaterial;

        // The skybox is a large cube that surrounds the entire scene and is used to create the illusion of a distant background.
        // We need to set the material to be unlit and render the back faces, so that we can see the inside of the cube.
        const skyBoxMaterial = new gfx.UnlitMaterial();
        skyBoxMaterial.side = gfx.Side.BACK;
        skyBoxMaterial.setColor(new gfx.Color(0.698, 1, 1));
        this.skybox.material = skyBoxMaterial;

        // Add the lights, ground, skybox, and sphere to the scene.
        this.scene.add(ambientLight);
        this.scene.add(directionalLight);
        this.scene.add(this.ground);
        this.scene.add(this.skybox);
    }

    
    // --- Update is called once each frame by the main graphics loop ---
    update(deltaTime: number): void 
    {
        // The camera controls need to be called in the update loop.
        // They require deltaTime to compute the camera movement
        // using a consistent translation and rotation speed.
        this.cameraControls.update(deltaTime);
    }
}