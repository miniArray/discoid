import mountvol from './mountvol'
import ps from 'windows-powershell'

// Network Mounts
// Get-WmiObject Win32_LogicalDisk | where -property DriveType -eq 4 | convertto-json

// Local Volumes
// get-volume | convertto-json

export async function list ({ local = true, network = true } = {}) {
  const isWin = /^win/.test(process.platform)
  let results = []

  if (isWin) {
    if (local) {
      const obj = await getLocalMounts()
      const discsLocal = parseLocalResults(obj)

      results = [
        ...results,
        ...discsLocal
      ]
    }

    if (network) {
      const obj = await getNetworkMounts()
      const discsNetwork = parseNetworkResults(obj)

      results = [
        ...results,
        ...discsNetwork
      ]
    }

    return results
  }

  return Promise.resolve([])
}

export async function fromPath (path) {
  const isWin = /^win/.test(process.platform)

  return Promise.resolve([])
}

function getNetworkMounts () {
  const cmd = ps.pipe(
    'Get-WmiObject Win32_LogicalDisk',
    'where -property DriveType -eq 4'
  )

  return ps.shell(ps.toJson(cmd))
}

function getLocalMounts () {
  const cmd = ps.pipe(
    'get-volume',
    'where -property DriveType -ne 9999'
  )

  return ps.shell(ps.toJson(cmd))
}

function getUUIDFromQualifiers (qualifiers) {
  return trimTrailingSlash(
    qualifiers
      .filter(q => q.Name === 'UUID')[0]
      .Value
  )
}

function getUUIDFromPath (path) {
  return path.split('\\')[3].slice(7, -2)
}

function getHost (path) {
  return path.split('\\')[2]
}

function parseNetworkResults (obj) {
  if (!('0' in obj.json))
    obj.json = { '0': obj.json }

  return Object.entries(obj.json).map(([key, val]) => {
    return {
      host: getHost(val.providerName),
      size: val.size,
      unc: val.providerName,
      letter: val.name[0],
      free: val.freeSpace,
      fs: val.fileSystem,
      uuid: getUUIDFromQualifiers(val.qualifiers),
      type: 'network'
    }
  })
}

function parseLocalResults (obj) {
  if (!('0' in obj.json))
    obj.json = { '0': obj.json }

  const discs = Object.entries(obj.json)
    .map(([key, val]) => val)
    .filter(filterReserved)

  return discs.map(val => {
    return {
      size: val.size,
      unc: val.uniqueId.slice(0, -1),
      letter: val.driveLetter,
      free: val.sizeRemaining,
      fs: val.fileSystem,
      host: val.cimSystemProperties.serverName.toLowerCase(),
      uuid: getUUIDFromPath(val.uniqueId),
      type: val.driveType.toLowerCase(val.uniqueId)
    }
  })
}

function trimTrailingSlash (path) {
  return path
    .slice(0, -1)
    .slice(1)
}

function filterReserved (disc) {
  return disc.fileSystemLabel !== 'System Reserved'
}
