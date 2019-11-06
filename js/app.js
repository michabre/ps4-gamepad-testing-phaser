/**
 *
 */
const config = {
    type: Phaser.CANVAS,
    parent: 'game',
    width: 800,
    height: 600,
    input: {
        gamepad: true
    },
    backgroundColor: '#ffffff',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
};

let gamepad;
let title;
let controllerId;
let buttonPressed;
let controlStick;
let active;
const textColor = "rgb(0, 0, 0)";
const game = new Phaser.Game(config);

/**
 *
 */
function preload ()
{
    this.load.svg('ps4controller', 'assets/ps4controller-shape.svg');
    this.load.svg('ps4button-circle', 'assets/ps4button-circle.svg');
    this.load.svg('ps4stick', 'assets/ps4stick.svg');
    this.load.svg('ps4left-arrow', 'assets/ps4left-arrow.svg');
    this.load.svg('ps4right-arrow', 'assets/ps4right-arrow.svg');
    this.load.svg('ps4up-arrow', 'assets/ps4up-arrow.svg');
    this.load.svg('ps4down-arrow', 'assets/ps4down-arrow.svg');
    this.load.svg('ps4trackpad', 'assets/ps4trackpad.svg');
    this.load.svg('ps4share-button', 'assets/ps4share-button.svg');
    this.load.svg('ps4topleft-button', 'assets/ps4topleft-button.svg');
    this.load.svg('ps4topright-button', 'assets/ps4topright-button.svg');
    this.load.svg('ps4-button', 'assets/ps4-button.svg');
}

/**
 *
 */
function create ()
{
    // controller
    this.add.sprite(400, 370, 'ps4controller');

    // info text
    title = this.add.text(16, 16, 'PS4 Controller', {
        fontFamily: 'Helvetica, Arial',
        fontSize: '32px',
        fill: textColor
    });
    title.setShadow(1, 2, 'rgba(0, 0, 0, 0.75)', 2);

    controllerId = this.add.text(16, 60, 'ID:', {
        fontSize: '18px',
        fill: textColor
    });

    buttonPressed = this.add.text(16, 90, 'Button Pressed: ', {
        fontSize: '18px',
        fill: textColor
    });

    controlStick = this.add.text(16, 120, 'Control Stick: ', {
        fontSize: '18px',
        fill: textColor
    });
}

function update ()
{
    if (this.input.gamepad.total === 0) { return; }

    // Gamepad Tests
    gamepad = this.input.gamepad.getPad(0);

    // id
    controllerId.setText('ID: ' + gamepad.id);

    if(active) {
        active.visible = false;
    }

    // gamepad.axes
    if (gamepad.axes.length) {
        if( gamepad.axes[0].getValue() || gamepad.axes[1].getValue()) {
            controlStick.setText('Control Stick: Left');
            active = this.add.sprite(332, 380, "ps4stick");
            active.visible = true;
        }
        else if (gamepad.axes[2].getValue() || gamepad.axes[3].getValue()) {
            controlStick.setText('Control Stick: Right');
            active = this.add.sprite(468, 380, "ps4stick");
            active.visible = true;
        }
        else {}
    }

    // gamepad.buttons
    let gamepadButtons = gamepad.buttons;
    if (gamepadButtons.length) {
        let clicked = gamepadButtons.find(function(element) {
            if(element.pressed === true) {
                return element;
            }
        });

        if (clicked) {
            buttonPressed.setText('Button Pressed: ' + ps4Buttons[clicked.index].name);
            active = this.add.sprite(ps4Buttons[clicked.index].x, ps4Buttons[clicked.index].y, ps4Buttons[clicked.index].sprite);
            active.visible = true;
        }
    }
}
