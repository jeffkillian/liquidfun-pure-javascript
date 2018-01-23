

function Renderer(world,ctx) {
    var canvas=document.getElementById("ballCanvas");
    var ctx=canvas.getContext("2d");
    const SCALE = canvas.width/10

    this.render = function() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for (body = world.GetBodyList(); body; body = body.GetNext()){
            var transform = body.GetTransform();
            
            for (f = body.GetFixtureList(); f; f = f.GetNext())	{
                this.draw(f,transform);
            }
        }
        this.drawParticleSystem()
        ctx.stroke();
    }

    
    this.draw = function(fixture, transform){
        if (fixture.userData.type == "circle") return this.drawCircle(fixture.GetShape().m_radius, transform.p, fixture.color || "black")
        if (fixture.userData.type == "square") return this.drawPolygon(fixture, transform)
    }
    
    this.drawCircle = function(radius, pos, color, index = " "){
        const newRadius = radius*SCALE
        const x = pos.x*SCALE
        const y = pos.y*SCALE
        ctx.moveTo(x + newRadius, y)
        //ctx.fillStyle = "white"
        ctx.strokeStyle= color
         ctx.beginPath()
    
        ctx.arc(x,y,newRadius, 0,2*Math.PI);
       
        // ctx.fill()
        ctx.strokeStyle= "grey"
         ctx.stroke();
         
  
         ctx.font = '12px serif';
         ctx.strokeText(index, x, y);
  
  
         ctx.closePath()
    }
    
    this.drawPolygon = function(fixture, transform){
    
        const pos = fixture.GetBody().GetPosition()
        ctx.beginPath();
        
        //create a line
        //cct.lineWidth = .08;
        let truePoints = []
        var shape = fixture.GetShape()
        for (var i=0;i<shape.m_count; i++){
            const point = shape.m_vertices[i]
            truePoints.push(
                {x: point.x+pos.x,
                y: point.y + pos.y } 
            )
        }
     
        ctx.moveTo(truePoints[0].x*SCALE,truePoints[0].y*SCALE);
        for(var i=1;i<truePoints.length;i++) {
            ctx.lineTo(truePoints[i].x*SCALE,truePoints[i].y*SCALE);
        }
        ctx.lineTo(truePoints[0].x*SCALE,truePoints[0].y*SCALE) // line back to initial
        ctx.closePath()
        ctx.stroke();
    }
    
    this.drawParticleSystem = function() {
        var system = world.GetParticleSystemList()
        const particles = system.GetPositionBuffer()
        const userData = system.GetUserDataBuffer()
        for (var i=0;i<system.GetParticleCount(); i++){
          let color = "black"
            if (touchingParticles.indexOf(i) > -1){
              color = "green"
              //console.log("i is touching")
            } 
            this.drawCircle(system.m_particleDiameter/2,particles[i],color,i )
            
        }
    }
}