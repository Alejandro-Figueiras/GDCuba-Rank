const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

export const decryptBase64 = (input) => {
    let output = '';

    var i = 0;
    do {
        let b1 = characters.indexOf( input.charAt(i++) );
        let b2 = characters.indexOf( input.charAt(i++) );
        let b3 = characters.indexOf( input.charAt(i++) );
        let b4 = characters.indexOf( input.charAt(i++) );

        let a = ( ( b1 & 0x3F ) << 2 ) | ( ( b2 >> 4 ) & 0x3 );
        let b = ( ( b2 & 0xF  ) << 4 ) | ( ( b3 >> 2 ) & 0xF );
        let c = ( ( b3 & 0x3  ) << 6 ) | ( b4 & 0x3F );

        output += String.fromCharCode(a) + (b?String.fromCharCode(b):'') + (c?String.fromCharCode(c):'');

    } while( i < input.length );

    return output;
}

export const cryptBase64 = (input) => {
    let output     = '';

    let i = 0;
    do {
        let a = input.charCodeAt(i++);
        let b = input.charCodeAt(i++);
        let c = input.charCodeAt(i++);

        a = a ? a : 0;
        b = b ? b : 0;
        c = c ? c : 0;

        let b1 = ( a >> 2 ) & 0x3F;
        let b2 = ( ( a & 0x3 ) << 4 ) | ( ( b >> 4 ) & 0xF );
        let b3 = ( ( b & 0xF ) << 2 ) | ( ( c >> 6 ) & 0x3 );
        let b4 = c & 0x3F;

        if( ! b ) {
            b3 = b4 = 64;
        } else if( ! c ) {
            b4 = 64;
        }

        output += characters.charAt( b1 ) + characters.charAt( b2 ) + characters.charAt( b3 ) + characters.charAt( b4 );

    } while ( i < input.length );

    return output;
}