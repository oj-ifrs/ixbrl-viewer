export class Saver {

    async saveFrame (html) {
        let fileHandle;
        try {
          fileHandle = await this.getNewFileHandle();
        } catch (ex) {
          if (ex.name === 'AbortError') {
            return;
          }
          //gaEvent('Error', 'FileSaveAs1', ex.name);
          const msg = 'An error occured trying to open the file.';
          console.error(msg, ex);
          alert(msg);
          return;
        }
        try {
            //let frame = $(e)(":root")("iframe")
            //let h = frame.contentDocument.documentElement.outerHTML
            await this.writeFile(fileHandle, html);
          //this.setFile(fileHandle);
          //this.setModified(false);
        } catch (ex) {
          //gaEvent('Error', 'FileSaveAs2', ex.name);
          const msg = 'Unable to save file.';
          console.error(msg, ex);
          alert(msg);
          //gaEvent('Error', 'Unable to write file', 'FSAccess');
          return;
        } 
    }

    async getNewFileHandle() {
        /*const options = {
          types: [
            {
              description: 'HTML Files',
              accept: {
                'html': ['.html'],
              },
            },
          ],
        };*/
        const handle = await window.showSaveFilePicker(/*options*/);
        return handle;
    }
    
    // fileHandle is an instance of FileSystemFileHandle..
    async writeFile(fileHandle, contents) {
        // Create a FileSystemWritableFileStream to write to.
        const writable = await fileHandle.createWritable();
        // Write the contents of the file to the stream.
        await writable.write(contents);
        // Close the file and write the contents to disk.
        await writable.close();
    }

}