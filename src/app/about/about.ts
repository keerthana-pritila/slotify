import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
   sportImages = [
    {
      img: '/images/cricket.jpeg',
      title: 'Cricket',
      info: 'Fast-paced matches with exciting team gameplay'
    },
    {
      img: '/images/football.jpg',
      title: 'FootBall',
      info: 'Experience thrilling team spirit and energy.'
    },
    {
    img:'/images/badminton.jpeg',
    title:'Badminton',
    info:'Indoor action with speed and strategy.'
    },
    {
     img:'/images/tennis.jpeg',
     title:'Tennis',
     info:'Precision, agility and competitive fun.'
    },
    {
    img:'/images/basketball.jpeg',
    title:'Basketball',
    info:'Experience thrilling team spirit and energy.'
},
{
img:'/images/volleyball.jpeg',
title:'Volleyball',
info:'Team coordination and fast-paced court action.'
}
];
}
