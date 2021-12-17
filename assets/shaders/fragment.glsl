uniform sampler2D moonTexture;
varying vec2 vertexUV;

void main(){
    texture2D(moonTexture, vertexUV);
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}
}