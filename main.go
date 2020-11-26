package main

import (
	"encoding/hex"
	"fmt"
	"math/rand"
	"os"
	"time"

	svg "github.com/ajstarks/svgo"
	"github.com/lucasb-eyer/go-colorful"
)

// "▊", "▋", "❘", "❙", "❚", "▀", "▘", "▝", "▙", "▚", "▛", "▜", "▟", "▞", "░", "▒", "▓", "▂", "▁", "▬", "▔", "▫", "▯", "▭", "▱", "◽", "□", "◻", "▢", "⊞", "⊡", "⊟", "⊠", "▣", "▤", "▥", "▦", "⬚", "▧", "▨", "▩", "⬓", "◧", "⬒", "◨", "◩", "◪", "⬔", "⬕", "❏", "❐", "❑", "❒", "⧈", "◰", "◱", "◳", "◲", "◫", "⧇", "⧅", "⧄", "⍁", "⍂", "⟡", "⧉", "○", "◌", "◍", "◎", "◯", "❍", "◉", "⦾" ,"⊙", "⦿", "⊜", "⊖", "◴","⸨", "⋒" ,"⥑", "╳","❖","☱", "┬", "┴","╆", "╓","╚","╬"
const (
	letterNum        = 26
	fullRotation     = 360.0
	transparencyStep = .03

	width  = 720
	height = 720
)

var (
	transperency = 1.0
	rotationStep float64
)

func init() {
	// Seeds to generate random letters
	rand.Seed(time.Now().UnixNano())

	rotationStep = rand.Float64() * 90
}

func main() {
	scetchWidth := width / 2
	scetchHeight := height / 2

	// Main scetch area
	canvas := initCanvas(scetchWidth, scetchHeight)
	drawLetters(canvas)
	closeCanvas(canvas)
}

// Inits basic canvas, and define its draw area
func initCanvas(scetchWidth, scetchHeight int) *svg.SVG {
	canvas := svg.New(os.Stdout)
	canvas.Start(width, height)

	canvas.Rect(0, 0, width, height, "fill: "+colorful.WarmColor().Hex())
	for i := 0; i < rand.Intn(10); i++ {
		canvas.Rect(rand.Intn(width), rand.Intn(height), rand.Intn(width), rand.Intn(height), "fill: "+colorful.HappyColor().Hex())

	}
	for i := 0; i < rand.Intn(10); i++ {
		canvas.Circle(rand.Intn(width), rand.Intn(width), rand.Intn(width/3), "fill: "+colorful.HappyColor().Hex())
	}
	min := 60
	max := 250
	value := fmt.Sprint(rand.Intn(max-min) + min)
	canvas.Gstyle("font-family: serif; fill: " + colorful.WarmColor().Hex() + "; font-size: " + value + "pt")
	canvas.Gtransform(fmt.Sprintf("translate(%d, %d)", scetchWidth, scetchHeight))
	return canvas
}

func drawLetters(canvas *svg.SVG) {
	character := getRandomChar()
	for angel := 0.0; angel <= fullRotation; angel += rotationStep {
		canvas.Text(0, 0, character,
			fmt.Sprintf(`transform="rotate(%.3f)"`, angel),
			fmt.Sprintf(`fill-opacity="%.3f"`, transperency))
		transperency -= transparencyStep
	}
}

// Returns random character
func getRandomChar() string {
	shapes := []string{"▲", "▼", " ◀", "▶", "◢", "◣", "◥", "◤", "△", "▽", "◿", "◺", "◹", "◸", "▴", "▾", "◂", "▸", "▵", "▿", "◃", "▹", "◁", "▷", "◅", "▻", "◬", "⟁", "⧋", "⧊", "⊿", "∆", "∇", "◭", "◮", "⧩", "⧨", "⌔", "⟐", "◇", "◆", "◈", "⬖", "⬗", "⬘", "⬙", "⬠", "⬡", "⎔", "⋄", "◊", "⧫", "⬢", "⬣", "▰", "▪", "◼", "▮", "◾", "▗", "▖", "■", "∎", "▃", "▄", "▅", "▆", "▇", "█", "▌", "▐", "▍", "▎", "▉", "▊", "▋", "❘", "❙", "❚", "▀", "▘", "▝", "▙", "▚", "▛", "▜", "▟", "▞", "░", "▒", "▓", "▂", "▁", "▬", "▔", "▫", "▯", "▭", "▱", "◽", "□", "◻", "▢", "⊞", "⊡", "⊟", "⊠", "▣", "▤", "▥", "▦", "⬚", "▧", "▨", "▩", "⬓", "◧", "⬒", "◨", "◩", "◪", "⬔", "⬕", "❏", "❐", "❑", "❒", "⧈", "◰", "◱", "◳", "◲", "◫", "⧇", "⧅", "⧄", "⍁", "⍂", "⟡", "⧉", "○", "◌", "◍", "◎", "◯", "❍", "◉", "⦾", "⊙", "⦿", "⊜", "⊖", "◴", "⸨", "⋒", "⥑", "╳", "❖", "☱", "┬", "┴", "╆", "╓", "╚", "╬"}
	randomIndex := rand.Intn(len(shapes))
	pick := shapes[randomIndex]

	return pick
	//return string('a' + rand.Intn(letterNum))
}

func closeCanvas(canvas *svg.SVG) {
	canvas.Gend()
	canvas.Gend()
	canvas.End()
}

func randomHex(n int) (string, error) {
	bytes := make([]byte, n)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return hex.EncodeToString(bytes), nil
}
