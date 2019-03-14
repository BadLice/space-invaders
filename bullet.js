class Bullet
{
	constructor(x, y, dir)
	{
		this.x = x;
		this.y = y;
		this.w = 5;
		this.h = 15;
		this.speed = 7;
		this.col = color(random(0.3, 1) * 255, random(0.3, 1) * 255, random(0.3, 1) * 255);
		this.dir = dir; //true=up,false=down
	}

	draw()
	{
		noStroke();
		fill(this.col);
		rect(this.x - this.w / 2, this.y, this.w, this.h);
	}

	update()
	{
		if (this.dir)
			this.y -= this.speed;
		else
			this.y += this.speed;

	}

	outOfScreen()
	{
		return (this.y + this.h < 0) || this.y > height;
	}
}