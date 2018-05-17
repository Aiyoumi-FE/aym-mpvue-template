import request from './request'

export function getAlbumData ({page = 1, count = 20} = {}) {
  let params = {}
  params.start = (page - 1) * count
  params.count = count

  return request.get(`/api/cms/album`, params)
}

export function getAudioList ({albumId, page = 1, count = 20} = {}) {
  let params = {}
  params.start = (page - 1) * count
  params.count = count
  params.opr = 'find'
  params.albumId = albumId
  return request.get(`/api/audiolist`, params)
}

export function getAudioData (id) {
  let params = {}
  params.audioId = id

  return request.get(`/api/audio`, params)
}
