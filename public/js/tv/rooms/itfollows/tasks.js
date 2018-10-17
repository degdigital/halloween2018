const tasks = [
    {
        name: 'taskA',
        label: 'Turn on flashlight',
        instructions: 'Turn on the flashlight',
        type: 'button',
        value: true
    },
    {
        name: 'taskB',
        label: 'Turn off flashlight',
        instructions: 'Turn off the flashlight',
        type: 'button',
        value: true
    },
    {
        name: 'taskC',
        label: 'Refill generator',
        instructions: 'Refill the power generator',
        type: 'button',
        value: true
    },
    {
        name: 'taskD',
        label: 'Turn off lamp',
        instructions: 'Turn off the lamp',
        type: 'button',
        value: true
    },
    {
        name: 'taskE',
        label: 'Turn on lamp',
        instructions: 'Turn on the lamp',
        type: 'button',
        value: true
    },
    {
        name: 'taskF',
        label: 'Break window',
        instructions: 'Break the window',
        type: 'button',
        value: true
    },
    {
        name: 'taskG',
        label: 'Open window',
        instructions: 'Open the window',
        type: 'button',
        value: true
    },
    {
        name: 'taskH',
        label: 'Close window',
        instructions: 'Close the window',
        type: 'button',
        value: true
    },
    {
        name: 'taskI',
        label: 'Cut red wire',
        instructions: 'Cut the red wire',
        type: 'button',
        value: true
    },
    {
        name: 'taskJ',
        label: 'Cut blue wire',
        instructions: 'Cut the blue wire',
        type: 'button',
        value: true
    },
    {
        name: 'taskK',
        label: 'Cut green wire',
        instructions: 'Cut the green wire',
        type: 'button',
        value: true
    },
    {
        name: 'taskL',
        label: 'Regret choices',
        instructions: 'Regret your life choices',
        type: 'button',
        value: true
    },
    {
        name: 'taskM',
        label: 'Key in lock',
        instructions: 'Put the key in the lock',
        type: 'button',
        value: true
    },
    {
        name: 'taskN',
        label: 'Lock door',
        instructions: 'Lock the door',
        type: 'button',
        value: true
    },
    {
        name: 'taskO',
        label: 'Unlock door',
        instructions: 'Unlock the door',
        type: 'button',
        value: true
    },
    {
        name: 'taskP',
        label: 'Say prayers',
        instructions: 'Say your prayers',
        type: 'button',
        value: true
    },
    {
        name: 'taskQ',
        label: 'Open blinds',
        instructions: 'Open the window blinds',
        type: 'button',
        value: true
    },
    {
        name: 'taskR',
        label: 'Close blinds',
        instructions: 'Close the window blinds',
        type: 'button',
        value: true
    },
    {
        name: 'taskS',
        label: 'Start fire',
        instructions: 'Start a fire',
        type: 'button',
        value: true
    },
    {
        name: 'taskT',
        label: 'Put out fire',
        instructions: 'Put out the fire',
        type: 'button',
        value: true
    },
    {
        name: 'taskU',
        label: 'Move dresser',
        instructions: 'Move the dresser',
        type: 'button',
        value: true
    },
    {
        name: 'taskV',
        label: 'Move ottoman',
        instructions: 'Move the ottoman',
        type: 'button',
        value: true
    },
    {
        name: 'taskW',
        label: 'Move wardrobe',
        instructions: 'Move the wardrobe',
        type: 'button',
        value: true
    },
    {
        name: 'taskX',
        label: 'Hide in wardrobe',
        instructions: 'Hide in the wardrobe',
        type: 'button',
        value: true
    },
    {
        name: 'taskY',
        label: 'Hide in closet',
        instructions: 'Hide in the closet',
        type: 'button',
        value: true
    },
    {
        name: 'taskZ',
        label: 'Break bottle',
        instructions: 'Break the bottle',
        type: 'button',
        value: true
    },
    {
        name: 'taskAA',
        label: 'Say prayers',
        instructions: 'Say your prayers',
        type: 'button',
        value: true
    },
    {
        name: 'taskBB',
        label: 'Put on glasses',
        instructions: 'Put on your glasses',
        type: 'button',
        value: true
    },
    {
        name: 'taskCC',
        label: 'Take off glasses',
        instructions: 'Take off your glasses',
        type: 'button',
        value: true
    },
    {
        name: 'taskDD',
        label: 'Take off shoes',
        instructions: 'Take off your shoes',
        type: 'button',
        value: true
    },
    {
        name: 'taskEE',
        label: 'Put on shoes',
        instructions: 'Put on your shoes',
        type: 'button',
        value: true
    },
    {
        name: 'taskFF',
        label: 'Ringer on silent',
        instructions: 'Put your cell phone ringer on silent',
        type: 'button',
        value: true
    },
    {
        name: 'taskGG',
        label: 'Ringer on ring',
        instructions: 'Put your cell phone ringer on ring',
        type: 'button',
        value: true
    },
    {
        name: 'taskHH',
        label: 'Hush child',
        instructions: 'Hush the child',
        type: 'button',
        value: true
    },
    {
        name: 'taskII',
        label: 'Stifle sneeze',
        instructions: 'Stifle a sneeze',
        type: 'button',
        value: true
    },
    {
        name: 'taskJJ',
        label: 'Call mom',
        instructions: 'Call your mom',
        type: 'button',
        value: true
    },
    {
        name: 'taskKK',
        label: 'Do time warp',
        instructions: 'Do the time warp',
        type: 'button',
        value: true
    },
    {
        name: 'taskLL',
        label: 'Apply bandage',
        instructions: 'Apply the bandage',
        type: 'button',
        value: true
    },
    {
        name: 'taskMM',
        label: 'Remove bandage',
        instructions: 'Remove the bandage',
        type: 'button',
        value: true
    },
    {
        name: 'taskNN',
        label: 'Reload shotgun',
        instructions: 'Reload the shotgun',
        type: 'button',
        value: true
    },
    {
        name: 'taskOO',
        label: 'Do barrel roll',
        instructions: 'Do a barrel roll',
        type: 'button',
        value: true
    },
    {
        name: 'taskPP',
        label: 'Turn left',
        instructions: 'Turn left',
        type: 'button',
        value: true
    },
    {
        name: 'taskQQ',
        label: 'Turn right',
        instructions: 'Turn right',
        type: 'button',
        value: true
    },
    {
        name: 'taskRR',
        label: 'Turn back',
        instructions: 'Turn back',
        type: 'button',
        value: true
    },
    {
        name: 'taskSS',
        label: 'Walk forward',
        instructions: 'Walk forward',
        type: 'button',
        value: true
    },
    {
        name: 'taskTT',
        label: 'Walk backward',
        instructions: 'Walk backward',
        type: 'button',
        value: true
    },
    {
        name: 'taskUU',
        label: 'Strafe',
        instructions: 'Strafe',
        type: 'button',
        value: true
    },
    {
        name: 'taskVV',
        label: 'Hide',
        instructions: 'Hide',
        type: 'button',
        value: true
    },
    {
        name: 'taskWW',
        label: 'Climb stairs',
        instructions: 'Climb the stairs',
        type: 'button',
        value: true
    },
    {
        name: 'taskXX',
        label: 'Up ladder',
        instructions: 'Climb up the ladder',
        type: 'button',
        value: true
    },
    {
        name: 'taskYY',
        label: 'Down ladder',
        instructions: 'Climb down the ladder',
        type: 'button',
        value: true
    },
    {
        name: 'taskZZ',
        label: 'Split up',
        instructions: 'Split up the group',
        type: 'button',
        value: true
    },
    {
        name: 'taskAAA',
        label: 'Run up stairs',
        instructions: 'Run up the stairs',
        type: 'button',
        value: true
    },
    {
        name: 'taskBBB',
        label: 'Run down stairs',
        instructions: 'Run down the stairs',
        type: 'button',
        value: true
    },
    {
        name: 'taskCCC',
        label: 'Cower',
        instructions: 'Cower in fear',
        type: 'button',
        value: true
    },
    {
        name: 'taskDDD',
        label: 'Sharpen knife',
        instructions: 'Sharpen the knife',
        type: 'button',
        value: true
    },
    {
        name: 'taskEEE',
        label: 'Grab knife',
        instructions: 'Grab a knife',
        type: 'button',
        value: true
    },
    {
        name: 'taskFFF',
        label: 'Put down knife',
        instructions: 'Put down the knife',
        type: 'button',
        value: true
    }
];

export default tasks;