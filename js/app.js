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
const textColor = "rgb(0, 0, 0)";
const ps4Buttons = {
    0: {"name":"Cross"},
    1: {"name":"Circle"},
    2: {"name":"Square"},
    3: {"name":"Triangle"},
    4: {"name":"L1"},
    5: {"name":"R1"},
    6: {"name":"L2"},
    7: {"name":"R2"},
    8: {"name":"Share"},
    9: {"name":"Options"},
    10: {"name":"Left Stick Button"},
    11: {"name":"Right Stick Button"},
    12: {"name":"Up Arrow"},
    13: {"name":"Down Arrow"},
    14: {"name":"Left Arrow"},
    15: {"name":"Right Arrow"},
    16: {"name":"PS Button"},
    17: {"name":"Trackpad"}
};

const game = new Phaser.Game(config);

/**
 *
 */
function preload ()
{
    this.load.image('ps4controller', 'assets/ps4controller.png');
}

/**
 *
 */
function create ()
{
    // controller
    this.add.image(400, 370, 'ps4controller');

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

    // gamepad.axes
    if (gamepad.axes.length) {
        if( gamepad.axes[0].getValue() || gamepad.axes[1].getValue()) {
            controlStick.setText('Control Stick: Left');
        }
        else if (gamepad.axes[2].getValue() || gamepad.axes[3].getValue()) {
            controlStick.setText('Control Stick: Right');
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
        }
    }
}
