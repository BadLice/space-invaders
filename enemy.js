class Enemy
{
	constructor(x, y, size)
	{
		this.x = x;
		this.y = y;
		this.size = size;
		this.alive = true;
	}

	draw()
	{
		if (this.alive)
		{
			stroke(0);
			fill(255, 0, 0);
			rect(this.x, this.y, this.size, this.size);
		}
	}

	drawDebug()
	{
		stroke(0);
		if (this.alive)
			fill(255, 0, 0);
		else
			fill(0, 0, 255);

		rect(this.x, this.y, this.size, this.size);
	}

	collision(x, y)
	{
		if (x >= this.x && x <= this.x + this.size && y >= this.y && y <= this.y + this.size)
			this.alive = false;
		return !this.alive;
	}
}