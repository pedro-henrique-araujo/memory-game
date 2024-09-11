import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

interface Card {
  icon: string;
  flipped: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  cards: Card[] = [];
  firstCardIndex: number | null = null;
  secondCardIndex: number | null = null;
  lockBoard: boolean = false;

  icons: string[] = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍍', '🍒', '🍑'];

  constructor() {}

  ngOnInit(): void {
    this.resetGame();
  }

  resetGame(): void {
    this.cards = [];
    this.firstCardIndex = null;
    this.secondCardIndex = null;
    this.lockBoard = false;

    // Duplicate and shuffle icons
    const cardIcons = [...this.icons, ...this.icons];
    this.shuffleArray(cardIcons);

    // Create card objects
    for (let icon of cardIcons) {
      this.cards.push({
        icon: icon,
        flipped: false,
        matched: false
      });
    }
  }

  shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  flipCard(index: number): void {
    if (this.lockBoard || this.cards[index].flipped || this.cards[index].matched) return;

    this.cards[index].flipped = true;

    if (this.firstCardIndex === null) {
      this.firstCardIndex = index;
    } else if (this.secondCardIndex === null) {
      this.secondCardIndex = index;
      this.checkForMatch();
    }
  }

  checkForMatch(): void {
    if (this.firstCardIndex !== null && this.secondCardIndex !== null) {
      this.lockBoard = true;

      const firstCard = this.cards[this.firstCardIndex];
      const secondCard = this.cards[this.secondCardIndex];

      if (firstCard.icon === secondCard.icon) {
        firstCard.matched = true;
        secondCard.matched = true;
        this.resetBoard();
      } else {
        setTimeout(() => {
          firstCard.flipped = false;
          secondCard.flipped = false;
          this.resetBoard();
        }, 1000);
      }
    }
  }

  resetBoard(): void {
    this.firstCardIndex = null;
    this.secondCardIndex = null;
    this.lockBoard = false;
  }
}
