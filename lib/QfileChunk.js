var fileChunk = function(options = {file:''}){


        var setting ={
            ...options
        }
        var start = 0,
        end = 0,
        chunkSize = 1024000,
        currentChunk = 0,
        tmpDataList = [];

        var taskId =(new Date()).getTime()+''+parseInt(Math.random()*10000000);
        var chunks = Math.ceil(setting.file.size / chunkSize);
        console.log(taskId,chunks);

        var  blobSlice =
            window.File.prototype.slice ||
            window.File.prototype.mozSlice ||
            window.File.prototype.webkitSlice;
     


        var inner = function(){
            (start = currentChunk * chunkSize),
                        (end =
                            start + chunkSize >= setting.file.size
                                ? setting.file.size
                                : start + chunkSize);

                    let pieceFile = blobSlice.call(
                        setting.file,
                        start,
                        end
                    );

                    console.log(pieceFile);


                    pieceFile.name = setting.file.name;
                    let tmpObj = {
                        fileName:setting.file.name,
                        fileType:setting.file.type,
                        file: pieceFile,
                        size: end - start,
                        // currentNum: currentChunk,
                        taskId:taskId,
                        chunk:tmpDataList.length,
                        totalChunk:chunks,
                        totalSize:setting.file.size
                    };

                    tmpDataList.push(tmpObj);
                    currentChunk++;

            if (currentChunk < chunks) {
               inner();
            }       
        }
               inner();



        return tmpDataList;
}

	
module.exports.QfileChunk = fileChunk;