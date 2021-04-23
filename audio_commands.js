const {exec} = require("child_process")


const audio_commands = {
        '!shutup': "can_you_like_shutup.mp3",
        "!threat": "threat.mp3",
        "!cornholio": "cornholio.mp3",
        "!wetfart": "wet_fart.mp3",
        "!reverbfart": "reverb_fart.mp3",
        "!fart": "fart.mp3",
        "!oof": "oof.mp3",
        "!bruh": "bruh.mp3",
        "!anime": "anime.mp3",
        "!earrape": "earrape.mp3",
        "!airhorn": "airhorn.mp3",
        "!thissucks": "this_sucks.mp3",
        "!laughing" : "laughing.mp3"
}

const isAudioCommand = ((command) => Object.keys(audio_commands).indexOf(command) !== -1)

const executeAudioCommand = ((command) => {
    let media_file = audio_commands[command]
    exec(`vlc --qt-start-minimized --volume 1 ./media/${media_file}`, (err,stdout,stderr) => {
        console.log('derp')
    })
})

exports.isAudioCommand = isAudioCommand
exports.executeAudioCommand = executeAudioCommand
