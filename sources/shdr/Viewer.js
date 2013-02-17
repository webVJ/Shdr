// Generated by CoffeeScript 1.4.0
(function() {
  var Viewer;

  Viewer = (function() {

    function Viewer(domCanvas) {
      var _this = this;
      this.time = 0.0;
      this.dom = $('#' + domCanvas);
      this.renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      this.dom.append(this.renderer.domElement);
      this.material = this.defaultMaterial();
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(35, this.dom.width() / this.dom.height(), 1, 3000);
      this.controls = new THREE.OrbitControls(this.camera, this.dom[0]);
      this.scene.add(this.camera);
      this.loader = new THREE.JSONLoader();
      this.loadModel('models/monkey_mid.js');
      this.onResize();
      window.addEventListener('resize', (function() {
        return _this.onResize();
      }), false);
    }

    Viewer.prototype.update = function() {
      this.controls.update();
      this.time += 0.001;
      this.uniforms.time.value = this.time;
      if (this.model) {
        this.model.rotation.y = this.time * 5;
      }
      return this.renderer.render(this.scene, this.camera);
    };

    Viewer.prototype.onResize = function() {
      if (this.camera) {
        this.camera.aspect = this.dom.width() / this.dom.height();
        this.camera.updateProjectionMatrix();
        this.camera.position.z = 900 / this.dom.width() * 4;
        this.camera.lookAt(this.scene.position);
      }
      return this.renderer.setSize(this.dom.width(), this.dom.height());
    };

    Viewer.prototype.loadModel = function(path) {
      var _this = this;
      return this.loader.load(path, (function(g) {
        return _this.addModel(g);
      }));
    };

    Viewer.prototype.addModel = function(geo) {
      this.model = new THREE.Mesh(geo, this.material);
      return this.scene.add(this.model);
    };

    Viewer.prototype.updateShader = function(fs) {
      this.material.fragmentShader = fs;
      return this.material.needsUpdate = true;
    };

    Viewer.prototype.defaultMaterial = function() {
      this.uniforms = {
        time: {
          type: 'f',
          value: 0.0
        }
      };
      this.vs = ['varying vec3 fNormal;', 'varying vec4 fPosition;', 'void main()', '{', 'fNormal = normalMatrix * normal;', 'fPosition = projectionMatrix * modelViewMatrix * vec4(position, 1.0);', 'gl_Position = fPosition;', '}'].join("\n");
      this.fs = ['uniform float time;', 'varying vec3 fNormal;', 'varying vec4 fPosition;', 'void main()', '{', '  gl_FragColor = vec4(fNormal, 1.0);', '}'].join("\n");
      return new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: this.vs,
        fragmentShader: this.fs
      });
    };

    return Viewer;

  })();

  this.shdr || (this.shdr = {});

  this.shdr.Viewer = Viewer;

}).call(this);