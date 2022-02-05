const path = require('path');
const { fs, log, util } = require('vortex-api');

const GAME_ID = 'residentevil4';
const GAME_BIN = 'Bin32/bio4.exe';
const STEAM_ID = 254700;
const STEAM_DLL = 'Bin32/steam_api.dll';

function findGame() {
  return util.steam.findByAppId(STEAM_ID.toString())
    .then(game => game.gamePath);
}

function prepareForModding(discovery) {
  return fs.ensureDirAsync(path.join(discovery.path, 'Data', 'Override'));
}

function main(context) {
  context.registerGame({
    id: GAME_ID,
    name: 'Resident Evil 4',
    mergeMods: true,
    queryPath: findGame,
    supportedTools: [],
    queryModPath: () => '.',
    logo: 'gameart.jpg',
    executable: () => GAME_BIN,
    requiredFiles: [
      GAME_BIN,
      STEAM_DLL
    ],
    setup: undefined,
    environment: {
      SteamAPPId: STEAM_ID.toString(),
    },
    details: {
      steamAppId: STEAM_ID,
    },
  });
}

module.exports = {
  default: main
};