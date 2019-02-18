export default new class InputFile {
  constructor() {
    this.containerSelector = 'form__input-file';
    this.inputFileField = 'form__input-file-field';
    this.inputFileText = 'form__input-file-info';
    this.Kb = 1024;
    this.Mb = 1048576;

    this.handlers();
  }

  handlers() {
    $(document)
      .on('change', `.${this.inputFileField}`, ({ currentTarget }) => {
        this.showFileName(currentTarget);
      });
  }

  showFileName(file) {
    const inputFileData = file.files[0];

    if (!inputFileData) return;

    const { name, size } = inputFileData;
    const weight = this.returnFileSize(size);
    const inputFileInfo = `Your file ${name} (${weight}) downloaded`;

    $(file)
      .parent(`.${this.containerSelector}`)
      .find(`.${this.inputFileText}`)
      .text(inputFileInfo);
  }

  returnFileSize(number) {
    if (number < this.Kb) {
      return `${number}b`;
    }
    if (number > this.Kb && number < this.Mb) {
      return `${(number / this.Kb).toFixed(1)}Kb`;
    }
    if (number > this.Mb) {
      return `${(number / this.Mb).toFixed(1)}Mb`;
    }
    return false;
  }
}();
