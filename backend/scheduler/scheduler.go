package scheduler

import (
	"log"

	"github.com/robfig/cron/v3"
)

type Scheduler struct {
	cron *cron.Cron
}

func NewScheduler() *Scheduler {
	return &Scheduler{
		cron: cron.New(),
	}
}


func (s *Scheduler) Register(spec string, task func()){
_, err := s.cron.AddFunc(spec, func() {
	log.Println("=CRON START=", spec)
	task()
	log.Println("=CRON END=", spec)
})

	if err != nil {
		log.Fatalln(err)
	}
}

func (s *Scheduler) Start(){
	s.cron.Start()
}

func (s *Scheduler) Stop(){
	s.cron.Stop()
}
