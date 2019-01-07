import 'imports-loader?THREE=three!three/examples/js/QuickHull.js'
import 'imports-loader?THREE=three!three/examples/js/geometries/ConvexGeometry.js'
import * as THREE from 'three'

export default class RedTower extends THREE.Object3D {
  constructor() {
    super()

    this.materil = new THREE.MeshPhongMaterial({ color: '#ff5000' })

    const tower = this.createTower()

    this.add(tower)
  }

  createEntrance(v1, v2, mp1, v3, v4, mp2) {
    console.log(v1)
    const entrance = new THREE.Object3D()
    entrance.castShadow = true
    entrance.receiveShadow = true

    for (let i = 0; i < 201; i++) {
      if (i !== 0) {
        const vs1 = [
          new THREE.Vector3(v1.x, i, v1.y),
          new THREE.Vector3(v3.x, i, v3.y),
          new THREE.Vector3(v1.x, i - 1, v1.y),
          new THREE.Vector3(v3.x, i - 1, v3.y),
        ]
        const vs2 = [
          new THREE.Vector3(v2.x, i, v2.y),
          new THREE.Vector3(v4.x, i, v4.y),
          new THREE.Vector3(v2.x, i - 1, v2.y),
          new THREE.Vector3(v4.x, i - 1, v4.y),
        ]
        const right = new THREE.Mesh(
          new THREE.ConvexGeometry(vs1),
          this.materil
        )
        const left = new THREE.Mesh(
          new THREE.ConvexGeometry(vs2),
          this.materil
        )
        right.castShadow = true
        right.receiveShadow = true
        left.castShadow = true
        left.receiveShadow = true
        entrance.add(right)
        entrance.add(left)
        if (i === 200) {
          const curve1 = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(v1.x, i, v1.y),
            new THREE.Vector3(mp1.x, i + 60, mp1.y),
            new THREE.Vector3(v2.x, i, v2.y)
          )
          const curevePoint1 = curve1.getPoints(40)
          const curve2 = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(v3.x, i, v3.y),
            new THREE.Vector3(mp2.x, i + 60, mp2.y),
            new THREE.Vector3(v4.x, i, v4.y)
          )
          const curevePoint2 = curve2.getPoints(40)
          for (let k = 0; k < curevePoint1.length; k++) {
            if (k !== 0) {
              let top
              if (k < 20) {
                const vs = [
                  new THREE.Vector3(
                    curevePoint1[k].x,
                    curevePoint1[k].y,
                    curevePoint1[k].z
                  ),
                  new THREE.Vector3(
                    curevePoint1[k - 1].x,
                    curevePoint1[k - 1].y,
                    curevePoint1[k - 1].z
                  ),
                  new THREE.Vector3(
                    curevePoint2[k].x,
                    curevePoint2[k].y,
                    curevePoint2[k].z
                  ),
                  new THREE.Vector3(
                    curevePoint2[k - 1].x,
                    curevePoint2[k - 1].y,
                    curevePoint2[k - 1].z
                  ),
                  new THREE.Vector3(
                    v1.x,
                    curevePoint1[k].y,
                    v1.y
                  ),
                  new THREE.Vector3(
                    v3.x,
                    curevePoint2[k].y,
                    v3.y
                  ),
                  new THREE.Vector3(
                    v1.x,
                    curevePoint1[k - 1].y,
                    v1.y
                  ),
                  new THREE.Vector3(
                    v3.x,
                    curevePoint2[k - 1].y,
                    v3.y
                  ),
                ]
                top = new THREE.Mesh(
                  new THREE.ConvexGeometry(vs),
                  this.materil
                )
              } else if (k >= 20) {
                const vs = [
                  new THREE.Vector3(
                    curevePoint1[k].x,
                    curevePoint1[k].y,
                    curevePoint1[k].z
                  ),
                  new THREE.Vector3(
                    curevePoint1[k - 1].x,
                    curevePoint1[k - 1].y,
                    curevePoint1[k - 1].z
                  ),
                  new THREE.Vector3(
                    curevePoint2[k].x,
                    curevePoint2[k].y,
                    curevePoint2[k].z
                  ),
                  new THREE.Vector3(
                    curevePoint2[k - 1].x,
                    curevePoint2[k - 1].y,
                    curevePoint2[k - 1].z
                  ),
                  new THREE.Vector3(
                    v2.x,
                    curevePoint1[k].y,
                    v2.y
                  ),
                  new THREE.Vector3(
                    v4.x,
                    curevePoint2[k].y,
                    v4.y
                  ),
                  new THREE.Vector3(
                    v2.x,
                    curevePoint1[k - 1].y,
                    v2.y
                  ),
                  new THREE.Vector3(
                    v4.x,
                    curevePoint2[k - 1].y,
                    v4.y
                  ),
                ]
                top = new THREE.Mesh(
                  new THREE.ConvexGeometry(vs),
                  this.materil
                )
              }
              top.castShadow = true
              top.receiveShadow = true
              entrance.add(top)
            }
          }
        }
      }
    }

    return entrance
  }

  createTower() {
    const tower = new THREE.Object3D()
    tower.castShadow = true
    tower.receiveShadow = true

    const circle = new THREE.Mesh(
      new THREE.CircleGeometry(500, 1080, Math.PI / 3),
      this.materil
    )
    circle.rotation.x = -Math.PI / 2
    circle.castShadow = true
    circle.receiveShadow = true

    const topCircle = circle.clone()
    topCircle.position.y = 1000

    const circle2 = new THREE.Mesh(
      new THREE.CircleGeometry(480, 1080, Math.PI / 3),
      this.materil
    )
    circle2.rotation.x = -Math.PI / 2
    circle2.castShadow = true
    circle2.receiveShadow = true

    console.log(circle.geometry.vertices)

    const under = new THREE.Object3D()
    under.castShadow = true
    under.receiveShadow = true

    const entrance = this.createEntrance(
      circle.geometry.vertices[1],
      circle.geometry.vertices[30],
      circle.geometry.vertices[15],
      circle2.geometry.vertices[1],
      circle2.geometry.vertices[30],
      circle2.geometry.vertices[15],
    )

    for (let i = 10; i < 1081; i++) {
      if (i === 1080) {
        const vs = [
          new THREE.Vector3(
            circle.geometry.vertices[i].x,
            circle.geometry.vertices[i].z,
            circle.geometry.vertices[i].y,
          ),
          new THREE.Vector3(
            circle.geometry.vertices[i].x,
            circle.geometry.vertices[i].z + 230,
            circle.geometry.vertices[i].y,
          ),
          new THREE.Vector3(
            circle.geometry.vertices[1].x,
            circle.geometry.vertices[1].z,
            circle.geometry.vertices[1].y,
          ),
          new THREE.Vector3(
            circle.geometry.vertices[1].x,
            circle.geometry.vertices[1].z + 230,
            circle.geometry.vertices[1].y,
          ),
          new THREE.Vector3(
            circle2.geometry.vertices[i].x,
            circle2.geometry.vertices[i].z,
            circle2.geometry.vertices[i].y,
          ),
          new THREE.Vector3(
            circle2.geometry.vertices[i].x,
            circle2.geometry.vertices[i].z + 230,
            circle2.geometry.vertices[i].y,
          ),
          new THREE.Vector3(
            circle2.geometry.vertices[1].x,
            circle2.geometry.vertices[1].z,
            circle2.geometry.vertices[1].y,
          ),
          new THREE.Vector3(
            circle2.geometry.vertices[1].x,
            circle2.geometry.vertices[1].z + 230,
            circle2.geometry.vertices[1].y,
          ),
        ]
        const mesh = new THREE.Mesh(
          new THREE.ConvexGeometry(vs),
          this.materil
        )
        mesh.castShadow = true
        mesh.receiveShadow = true
        under.add(mesh)
      } else {
        const vs = [
          new THREE.Vector3(
            circle.geometry.vertices[i].x,
            circle.geometry.vertices[i].z,
            circle.geometry.vertices[i].y,
          ),
          new THREE.Vector3(
            circle.geometry.vertices[i].x,
            circle.geometry.vertices[i].z + 230,
            circle.geometry.vertices[i].y,
          ),
          new THREE.Vector3(
            circle.geometry.vertices[i + 1].x,
            circle.geometry.vertices[i + 1].z,
            circle.geometry.vertices[i + 1].y,
          ),
          new THREE.Vector3(
            circle.geometry.vertices[i + 1].x,
            circle.geometry.vertices[i + 1].z + 230,
            circle.geometry.vertices[i + 1].y,
          ),
          new THREE.Vector3(
            circle2.geometry.vertices[i].x,
            circle2.geometry.vertices[i].z,
            circle2.geometry.vertices[i].y,
          ),
          new THREE.Vector3(
            circle2.geometry.vertices[i].x,
            circle2.geometry.vertices[i].z + 230,
            circle2.geometry.vertices[i].y,
          ),
          new THREE.Vector3(
            circle2.geometry.vertices[i + 1].x,
            circle2.geometry.vertices[i + 1].z,
            circle2.geometry.vertices[i + 1].y,
          ),
          new THREE.Vector3(
            circle2.geometry.vertices[i + 1].x,
            circle2.geometry.vertices[i + 1].z + 230,
            circle2.geometry.vertices[i + 1].y,
          ),
        ]
        const mesh = new THREE.Mesh(
          new THREE.ConvexGeometry(vs),
          this.materil
        )
        mesh.castShadow = true
        mesh.receiveShadow = true
        under.add(mesh)
      }
    }

    under.add(entrance)

    const center = new THREE.Object3D()
    center.castShadow = true
    center.receiveShadow = true

    for (let i = 1; i < 1081; i++) {
      if (i === 1080) {
        const vs = [
          new THREE.Vector3(
            circle.geometry.vertices[i].x,
            circle.geometry.vertices[i].z + 230,
            circle.geometry.vertices[i].y,
          ),
          new THREE.Vector3(
            circle.geometry.vertices[i].x,
            circle.geometry.vertices[i].z + 800,
            circle.geometry.vertices[i].y,
          ),
          new THREE.Vector3(
            circle.geometry.vertices[1].x,
            circle.geometry.vertices[1].z + 230,
            circle.geometry.vertices[1].y,
          ),
          new THREE.Vector3(
            circle.geometry.vertices[1].x,
            circle.geometry.vertices[1].z + 800,
            circle.geometry.vertices[1].y,
          ),
          new THREE.Vector3(
            circle2.geometry.vertices[i].x,
            circle2.geometry.vertices[i].z + 230,
            circle2.geometry.vertices[i].y,
          ),
          new THREE.Vector3(
            circle2.geometry.vertices[i].x,
            circle2.geometry.vertices[i].z + 800,
            circle2.geometry.vertices[i].y,
          ),
          new THREE.Vector3(
            circle2.geometry.vertices[1].x,
            circle2.geometry.vertices[1].z + 230,
            circle2.geometry.vertices[1].y,
          ),
          new THREE.Vector3(
            circle2.geometry.vertices[1].x,
            circle2.geometry.vertices[1].z + 800,
            circle2.geometry.vertices[1].y,
          ),
        ]
        const mesh = new THREE.Mesh(
          new THREE.ConvexGeometry(vs),
          this.materil
        )
        mesh.castShadow = true
        mesh.receiveShadow = true
        center.add(mesh)
      } else {
        const vs = [
          new THREE.Vector3(
            circle.geometry.vertices[i].x,
            circle.geometry.vertices[i].z + 230,
            circle.geometry.vertices[i].y,
          ),
          new THREE.Vector3(
            circle.geometry.vertices[i].x,
            circle.geometry.vertices[i].z + 800,
            circle.geometry.vertices[i].y,
          ),
          new THREE.Vector3(
            circle.geometry.vertices[i + 1].x,
            circle.geometry.vertices[i + 1].z + 230,
            circle.geometry.vertices[i + 1].y,
          ),
          new THREE.Vector3(
            circle.geometry.vertices[i + 1].x,
            circle.geometry.vertices[i + 1].z + 800,
            circle.geometry.vertices[i + 1].y,
          ),
          new THREE.Vector3(
            circle2.geometry.vertices[i].x,
            circle2.geometry.vertices[i].z + 230,
            circle2.geometry.vertices[i].y,
          ),
          new THREE.Vector3(
            circle2.geometry.vertices[i].x,
            circle2.geometry.vertices[i].z + 800,
            circle2.geometry.vertices[i].y,
          ),
          new THREE.Vector3(
            circle2.geometry.vertices[i + 1].x,
            circle2.geometry.vertices[i + 1].z + 230,
            circle2.geometry.vertices[i + 1].y,
          ),
          new THREE.Vector3(
            circle2.geometry.vertices[i + 1].x,
            circle2.geometry.vertices[i + 1].z + 800,
            circle2.geometry.vertices[i + 1].y,
          ),
        ]
        const mesh = new THREE.Mesh(
          new THREE.ConvexGeometry(vs),
          this.materil
        )
        mesh.castShadow = true
        mesh.receiveShadow = true
        center.add(mesh)
      }
    }

    tower.add(circle)
    tower.add(circle2)
    tower.add(topCircle)
    tower.add(under)
    tower.add(center)

    return tower
  }
}
