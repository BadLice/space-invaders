class EnemyManager
{
	constructor(shots)
	{
		this.population = [];
		this.cols = 11;
		this.rows = 5;
		this.speed = 5;
		this.dir = false; //true = left, false = right
		this.waitMoveMax = 0.1;
		this.waitMove = this.waitMoveMax;
		this.moveLease = millis();
		this.shots = shots; //refernced from player.shots
		this.enemyShots = []; //array of enemy bulelts
		this.shotProb = 0.0005;

		this.enemySize = 50
		this.gap = 22;
		this.x = 50;
		this.y = 50;

		//init matrix of enemies
		for (var x = 0; x < this.cols; x++)
		{
			this.population.push([]);
			for (var y = 0; y < this.rows; y++)
			{
				this.population[x].push(new Enemy((this.x) + ((50 + this.gap) * (x)), (this.y) + ((50 + this.gap) * (y)), this.enemySize));
			}
		}
	}

	getAlive()
	{
		var num = 0;
		for (var k of this.population)
		{
			for (var o of k)
			{
				if (o.alive)
					num++;
			}
		}
		return num;
	}


	win()
	{
		if (this.getAlive() == 0)
		{
			stroke(0, 255, 255);
			fill(255, 0, 255);
			textSize(90);
			text("YOU WON!", 250, 400);
		}
	}

	gameOver()
	{
		stroke(0, 255, 255);
		fill(255, 0, 255);
		textSize(90);
		text("YOU LOST!", 250, 400);
		stopGame();
	}

	draw()
	{
		this.waitMove = map(this.getAlive(), 0, this.rows * this.cols, 0, 0.8);
		this.win();

		var mustMove = false;
		if (millis() - this.moveLease > this.waitMove * 1000)
		{
			mustMove = true;
			this.moveLease = millis();
		}

		if (this.reachedEdge())
		{
			this.dir = !this.dir;
			this.moveDown();
		}

		for (var k of this.population)
		{
			for (var o of k)
			{
				o.draw();

				if (o.alive)
				{
					for (var i = this.shots.length - 1; i >= 0; i--)
					{
						if (o.collision(this.shots[i].x, this.shots[i].y))
							this.shots.splice(i, 1);
					}
					if (random(1) < this.shotProb)
						this.enemyShots.push(new Bullet(o.x, o.y - o.size / 2, false));
				}

			}
		}
		if (mustMove)
		{
			if (this.dir)
			{
				this.moveLeft();
			}
			else
			{
				this.moveRight();
			}
		}
		this.drawBullets();
	}

	drawBullets()
	{
		for (var i = this.enemyShots.length - 1; i >= 0; i--)
		{
			this.enemyShots[i].draw();
			this.enemyShots[i].update();

			if (player.collision(this.enemyShots[i].x, this.enemyShots[i].y))
				this.gameOver();

			if (this.enemyShots[i].outOfScreen())
				this.enemyShots.splice(i, 1);
		}
	}

	moveLeft()
	{
		this.x -= this.speed;
		for (var x = 0; x < this.cols; x++)
		{
			for (var y = 0; y < this.rows; y++)
			{
				this.population[x][y].x = (this.x) + ((this.enemySize + this.gap) * (x));
				this.population[x][y].y = (this.y) + ((this.enemySize + this.gap) * (y));

			}
		}
	}

	moveRight()
	{
		this.x += this.speed;
		for (var x = 0; x < this.cols; x++)
		{
			for (var y = 0; y < this.rows; y++)
			{
				this.population[x][y].x = (this.x) + ((this.enemySize + this.gap) * (x));
				this.population[x][y].y = (this.y) + ((this.enemySize + this.gap) * (y));

			}
		}
	}

	moveDown()
	{
		this.y += this.enemySize / 2;
	}

	reachedEdge()
	{

		if (this.dir)
			return this.population[0][0].x <= 0;
		else
			return this.population[this.cols - 1][0].x + (this.population[this.cols - 1][0].size) >= width;
	}

}