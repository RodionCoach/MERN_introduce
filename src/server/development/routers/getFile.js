import log from 'winston';
import request from 'request';
import {streamToBuffer, bufferToStream} from '../services'
import config from 'config';

function requestToYandex(fileName) {
    return new Promise(function(resolve, reject){
        var options = {
            url:  `${config.get('yandex.urlUpload')}/${config.get('yandex.folder')}/${fileName}`,
            headers: {'Authorization': `OAuth ${config.get('yandex.OAuth')}`}
        };
        request(options,  function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(
                    {
                        href: JSON.parse(response['body']).href,
                        fileName: fileName
                    }
                );
            }
            if (response.statusCode == 409) {
                reject(JSON.parse(response['body']).description);
            }
            reject(error);
        });
    })
}

export const getFile = (req, res) => {
    streamToBuffer(req).then(function (buffer) {
        requestToYandex(req.headers.filename)
            .then(function (obj) {
                return new Promise(function (resolve, reject) {
                    bufferToStream(buffer).pipe(
                        request.put(obj.href, function (error, response, body) {
                            if(response.statusCode == 201){
                                log.info(`file ${obj.fileName} inTo yandex disk ${response.statusCode}`);
                                resolve(obj.fileName);
                            } else {
                                log.error('put file to yandex disk error', response.statusCode);
                                log.error('error', body);
                            }
                        })
                    );
                });
            })
            .then(function (fileName) {
                return new Promise(function (resolve, reject) {
                    var options = {
                        url: `${config.get('yandex.urlDownloader')}/${config.get('yandex.folder')}/${fileName}`,
                        headers: {'Authorization': `OAuth ${config.get('yandex.OAuth')}`}
                    };
                    request.get(options, function (error, response, body) {
                        resolve(JSON.parse(response['body']).file);
                    })
                });
            }).then(function (urlFile) {
                console.log(urlFile);
            })
            .catch(function (err) {
                log.error('requestToYandex ', err);
            });
    });
    res.sendStatus(200);
};