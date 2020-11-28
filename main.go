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

const (
	letterNum        = 26
	fullRotation     = 360.0
	transparencyStep = .03

	width  = 1080
	height = 1080
)

var (
	transperency = 1.0
	rotationStep float64
	election     = "0"
)

func init() {
	// Seeds to generate random letters
	rand.Seed(time.Now().UnixNano())

	rotationStep = rand.Float64() * 90
}

func main() {
	election = fmt.Sprint(rand.Intn(5))
	scetchWidth := width / 2
	scetchHeight := height / 2

	// Main scetch area

	switch election {
	case "0":
		canvas := initCanvas(scetchWidth, scetchHeight)
		closeCanvas(canvas)
	case "1":
		canvas := initCanvas(scetchWidth, scetchHeight)
		drawLetters(canvas)
		closeCanvas(canvas)

	case "2":
		canvas := initCanvas(scetchWidth, scetchHeight)
		drawLetters(canvas)
		closeCanvas(canvas)
	case "3":
		canvas := initCanvas(scetchWidth, scetchHeight)
		createRectangles(canvas)
		closeCanvas(canvas)
	case "4":
		canvas := initCanvas(scetchWidth, scetchHeight)
		createRectangles(canvas)
		drawLetters(canvas)
		closeCanvas(canvas)

	}
	//paintCirclesAndRect(canvas)
	//createRectangles(canvas)
	//drawLetters(canvas)
}

// Inits basic canvas, and define its draw area
func initCanvas(scetchWidth, scetchHeight int) *svg.SVG {
	canvas := svg.New(os.Stdout)
	canvas.Start(width, height)
	min := 50
	max := 300
	value := fmt.Sprint(rand.Intn(max-min) + min)

	fmt.Print("HOLA" + fmt.Sprint(election))

	canvas.Rect(0, 0, width, height, "fill: "+colorful.WarmColor().Hex())

	if election == "0" || election == "1" {
		for i := 0; i < rand.Intn(20); i++ {
			canvas.Rect(rand.Intn(width), rand.Intn(height), rand.Intn(width), rand.Intn(height), "fill: "+colorful.HappyColor().Hex())
		}
		for i := 0; i < rand.Intn(20); i++ {
			canvas.Circle(rand.Intn(width), rand.Intn(width), rand.Intn(width/3), "fill: "+colorful.HappyColor().Hex())
		}
	}
	canvas.Gstyle("font-family: serif; fill: white; font-size: " + value + "pt")
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
	shapes := []string{"▲", "▼", " ◀", "▶", "◢", "◣", "◥", "◤", "△", "▽", "◿", "◺", "◹", "◸", "▴", "▾", "◂", "▸", "▵", "▿", "◃", "▹", "◁", "▷", "◅", "▻", "◬", "⟁", "⧋", "⧊", "⊿", "∆", "∇", "◭", "◮", "⧩", "⧨", "⌔", "⟐", "◇", "◆", "◈", "⬖", "⬗", "⬘", "⬙", "⬠", "⬡", "⎔", "⋄", "◊", "⧫", "⬢", "⬣", "▰", "▪", "◼", "▮", "◾", "▗", "▖", "■", "∎", "▃", "▄", "▅", "▆", "▇", "█", "▌", "▐", "▍", "▎", "▉", "▊", "▋", "❘", "▀", "▘", "▝", "▙", "▚", "▛", "▜", "▟", "▞", "░", "▒", "▓", "▂", "▁", "▬", "▔", "▫", "▯", "▭", "▱", "◽", "□", "◻", "▢", "⊞", "⊡", "⊟", "⊠", "▣", "▤", "▥", "▦", "⬚", "▧", "▨", "▩", "⬓", "◧", "⬒", "◨", "◩", "◪", "⬔", "⬕", "⍁", "⍂", "⟡", "⧉", "○", "◌", "◍", "◎", "◯", "◉", "⦾", "⊙", "⦿", "⊜", "⊖", "◴", "⋒", "⥑", "╳", "┬", "┴", "╆", "╓", "╚", "╬"}
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

func createRectangles(canvas *svg.SVG) {
	posX := -540

	totalWidth := 1080
	repetX := rand.Intn(10-3) + 3
	for i := 0; i < repetX; i++ {
		repetY := rand.Intn(7-3) + 3
		posY := -540
		totalHeight := 1080
		actualWidth := totalWidth / repetX
		if i == 0 {
			canvas.Rect(posX, posY, actualWidth, totalHeight, "fill: "+colorful.HappyColor().Hex())
		} else {
			posX = posX + actualWidth
			canvas.Rect(posX, posY, actualWidth, totalHeight, "fill: "+colorful.HappyColor().Hex())
		}
		for h := 0; h < repetY; h++ {
			actualHeight := totalHeight / repetY
			if h == 0 {
				canvas.Rect(posX, posY, actualWidth, actualHeight, "fill: "+colorful.WarmColor().Hex())
			} else {
				posY = posY + actualHeight
				canvas.Rect(posX, posY, actualWidth, actualHeight, "fill: "+colorful.WarmColor().Hex())

			}
		}

	}
}
