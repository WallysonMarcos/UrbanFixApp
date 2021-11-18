export function formatDateToBr(_data: string){
    let _aData = _data.split('-');
    let _formated = `${_aData[2]}/${_aData[1]}/${_aData[0]}`;
    return _formated;
}


export function formatTel( tel: string) {
    tel=tel.replace(/\D/g,"") 
    tel=tel.replace(/(.{0})(\d)/,"$1($2")
    tel=tel.replace(/(.{3})(\d)/,"$1) $2")  
    tel=tel.replace(/(.{4})$/,"-$1")

    return tel;
}
